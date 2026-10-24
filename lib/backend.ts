/**
 * The portal's backend: a Supabase project (database, sign-in, photo storage), reached over its REST
 * APIs with no client library. The URL and the anon key are public by design: Supabase's row-level
 * security (supabase/migrations) decides what the anon key may do, which is read published listings
 * and add enquiries and sign-ups. Everything else needs an admin's session.
 *
 * Both are empty until the project exists: the public forms then skip saving, and /admin shows how to
 * connect (or its demo mode on localhost).
 */
export const SUPABASE_URL = "";
export const SUPABASE_ANON_KEY = "";
export const backendReady = () => Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export type Session = { access_token: string; refresh_token: string; expires_at: number; user: { id: string; email: string } };

const SESSION_KEY = "ec-admin-session";

function headers(token?: string, extra: Record<string, string> = {}) {
  return { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token || SUPABASE_ANON_KEY}`, ...extra };
}

async function json<T>(res: Response): Promise<T> {
  const text = await res.text();
  const body = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(body?.message || body?.msg || body?.error_description || body?.error || `HTTP ${res.status}`);
  return body as T;
}

/* ── Auth ───────────────────────────────────────────────────── */

export function storedSession(): Session | null {
  try {
    const s = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    return s && s.access_token ? s : null;
  } catch {
    return null;
  }
}
function store(s: Session | null) {
  try {
    if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    /* private mode: the session lasts for this page only */
  }
}
const toSession = (b: { access_token: string; refresh_token: string; expires_in: number; user: { id: string; email: string } }): Session => ({
  access_token: b.access_token,
  refresh_token: b.refresh_token,
  expires_at: Math.floor(Date.now() / 1000) + b.expires_in,
  user: { id: b.user.id, email: b.user.email },
});

export async function signIn(email: string, password: string) {
  const b = await json<Parameters<typeof toSession>[0]>(
    await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, { method: "POST", headers: headers(undefined, { "Content-Type": "application/json" }), body: JSON.stringify({ email, password }) }),
  );
  const s = toSession(b);
  store(s);
  return s;
}

export async function sendReset(email: string, redirectTo: string) {
  await json(await fetch(`${SUPABASE_URL}/auth/v1/recover`, { method: "POST", headers: headers(undefined, { "Content-Type": "application/json" }), body: JSON.stringify({ email, redirect_to: redirectTo }) }));
}

/** A live session, refreshed when it is within a minute of expiring; null when signed out. */
export async function session(): Promise<Session | null> {
  const s = storedSession();
  if (!s) return null;
  if (s.expires_at - 60 > Date.now() / 1000) return s;
  try {
    const b = await json<Parameters<typeof toSession>[0]>(
      await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, { method: "POST", headers: headers(undefined, { "Content-Type": "application/json" }), body: JSON.stringify({ refresh_token: s.refresh_token }) }),
    );
    const n = toSession(b);
    store(n);
    return n;
  } catch {
    store(null);
    return null;
  }
}

/** The session in a password-recovery link (#access_token=…&type=recovery), stored; null if none. */
export async function sessionFromRecoveryLink(): Promise<Session | null> {
  const h = new URLSearchParams(location.hash.replace(/^#/, ""));
  if (h.get("type") !== "recovery" || !h.get("access_token")) return null;
  const access_token = h.get("access_token")!;
  const user = await json<{ id: string; email: string }>(await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: headers(access_token) }));
  const s: Session = { access_token, refresh_token: h.get("refresh_token") || "", expires_at: Math.floor(Date.now() / 1000) + Number(h.get("expires_in") || 3600), user: { id: user.id, email: user.email } };
  store(s);
  history.replaceState(null, "", location.pathname);
  return s;
}

export async function updatePassword(password: string) {
  const s = await session();
  if (!s) throw new Error("The reset link has expired. Ask for a new one.");
  await json(await fetch(`${SUPABASE_URL}/auth/v1/user`, { method: "PUT", headers: headers(s.access_token, { "Content-Type": "application/json" }), body: JSON.stringify({ password }) }));
}

export async function signOut() {
  const s = storedSession();
  store(null);
  if (s) await fetch(`${SUPABASE_URL}/auth/v1/logout`, { method: "POST", headers: headers(s.access_token) }).catch(() => {});
}

/* ── Database (PostgREST) ───────────────────────────────────── */

export async function rest<T>(path: string, init: { method?: string; body?: unknown; token?: string; prefer?: string } = {}): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method: init.method || "GET",
    headers: headers(init.token, { "Content-Type": "application/json", ...(init.prefer ? { Prefer: init.prefer } : {}) }),
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });
  return json<T>(res);
}

/* ── Storage ────────────────────────────────────────────────── */

export const publicUrl = (path: string) => `${SUPABASE_URL}/storage/v1/object/public/listings/${path.split("/").map(encodeURIComponent).join("/")}`;

export async function upload(path: string, file: Blob, token: string) {
  await json(
    await fetch(`${SUPABASE_URL}/storage/v1/object/listings/${path.split("/").map(encodeURIComponent).join("/")}`, {
      method: "POST",
      headers: headers(token, { "Content-Type": file.type || "application/octet-stream", "x-upsert": "true" }),
      body: file,
    }),
  );
  return path;
}

export async function removeObject(path: string, token: string) {
  await fetch(`${SUPABASE_URL}/storage/v1/object/listings`, {
    method: "DELETE",
    headers: headers(token, { "Content-Type": "application/json" }),
    body: JSON.stringify({ prefixes: [path] }),
  }).catch(() => {});
}

/* ── Public site: enquiries and sign-ups ────────────────────── */

/** Fire-and-forget insert from a public form; the visitor's own flow never waits on it. */
export function publicInsert(table: "enquiries" | "subscribers", row: Record<string, unknown>) {
  if (!backendReady() || typeof window === "undefined") return false;
  try {
    void fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      keepalive: true,
      headers: headers(undefined, { "Content-Type": "application/json", Prefer: "return=minimal" }),
      body: JSON.stringify(row),
    }).catch(() => {});
  } catch {
    /* the visitor's flow goes on */
  }
  return true;
}
