"use client";

import { useCallback, useEffect, useState } from "react";
import { Enquiries } from "./Enquiries";
import { Listings } from "./Listings";
import { Subscribers } from "./Subscribers";
import { demoStore, liveStore, type Store } from "./store";
import { backendReady, sendReset, sessionFromRecoveryLink, signIn, updatePassword } from "@/lib/backend";

type Tab = "enquiries" | "listings" | "subscribers";
type Boot = { kind: "loading" } | { kind: "setup" } | { kind: "login"; error?: string } | { kind: "reset" } | { kind: "ready"; store: Store };

const demoAllowed = () =>
  typeof window !== "undefined" && (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || new URLSearchParams(location.search).has("demo"));

/** /admin: the portal for enquiries, listings and newsletter sign-ups. */
export function AdminApp() {
  const [boot, setBoot] = useState<Boot>({ kind: "loading" });
  const [tab, setTab] = useState<Tab>("enquiries");
  const [newCount, setNewCount] = useState(0);

  const start = useCallback(async () => {
    if (!backendReady()) return setBoot(demoAllowed() ? { kind: "ready", store: demoStore() } : { kind: "setup" });
    try {
      if (await sessionFromRecoveryLink()) return setBoot({ kind: "reset" });
      const store = await liveStore();
      setBoot(store ? { kind: "ready", store } : { kind: "login" });
    } catch (e) {
      setBoot({ kind: "login", error: (e as Error).message === "not-admin" ? "This account is not an admin yet. Ask for it to be added to the admins list." : (e as Error).message });
    }
  }, []);

  useEffect(() => {
    void start();
    const fromHash = () => {
      const h = (location.hash.replace("#", "") || "enquiries") as Tab;
      if (["enquiries", "listings", "subscribers"].includes(h)) setTab(h);
    };
    fromHash();
    addEventListener("hashchange", fromHash);
    return () => removeEventListener("hashchange", fromHash);
  }, [start]);

  const go = (t: Tab) => {
    setTab(t);
    history.replaceState(null, "", `#${t}`);
  };

  if (boot.kind === "loading") return <div className="admin-app admin-center"><p className="admin-muted">Loading</p></div>;
  if (boot.kind === "setup") return <Setup />;
  if (boot.kind === "login") return <Login error={boot.error} onDone={start} />;
  if (boot.kind === "reset") return <SetPassword onDone={start} />;

  const { store } = boot;
  return (
    <div className="admin-app">
      <header className="admin-top">
        <div className="admin-brand">
          <span>ExpertCare</span>
          <em>Admin</em>
        </div>
        <nav className="admin-tabs" aria-label="Sections">
          <button type="button" className={tab === "enquiries" ? "on" : ""} onClick={() => go("enquiries")}>
            Enquiries{newCount > 0 && <b>{newCount}</b>}
          </button>
          <button type="button" className={tab === "listings" ? "on" : ""} onClick={() => go("listings")}>
            Listings
          </button>
          <button type="button" className={tab === "subscribers" ? "on" : ""} onClick={() => go("subscribers")}>
            Newsletter
          </button>
        </nav>
        <div className="admin-user">
          <a href="/" target="_blank" rel="noopener">
            View site
          </a>
          <span>{store.user}</span>
          <button
            type="button"
            onClick={async () => {
              await store.signOut();
              void start();
            }}
          >
            Sign out
          </button>
        </div>
      </header>
      {store.mode === "demo" && (
        <p className="admin-banner">Demo mode: the database is not connected, so changes stay in this browser. Sign out to reset the sample data.</p>
      )}
      <main className="admin-main">
        {tab === "enquiries" && <Enquiries store={store} onCount={setNewCount} />}
        {tab === "listings" && <Listings store={store} />}
        {tab === "subscribers" && <Subscribers store={store} />}
      </main>
    </div>
  );
}

function Login({ error, onDone }: { error?: string; onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(error || "");
  return (
    <div className="admin-app admin-center">
      <form
        className="admin-card admin-login"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setMsg("");
          try {
            await signIn(email.trim(), password);
            onDone();
          } catch (err) {
            setMsg((err as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        <h1>ExpertCare admin</h1>
        <label>
          Email
          <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {msg && <p className="admin-error">{msg}</p>}
        <button type="submit" className="admin-btn" disabled={busy}>
          {busy ? "Signing in" : "Sign in"}
        </button>
        <button
          type="button"
          className="admin-link"
          onClick={async () => {
            if (!email) return setMsg("Enter your email first.");
            try {
              await sendReset(email.trim(), `${location.origin}/admin/`);
              setMsg("If that email has an account, a reset link is on its way.");
            } catch (err) {
              setMsg((err as Error).message);
            }
          }}
        >
          Forgot password
        </button>
      </form>
    </div>
  );
}

function SetPassword({ onDone }: { onDone: () => void }) {
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  return (
    <div className="admin-app admin-center">
      <form
        className="admin-card admin-login"
        onSubmit={async (e) => {
          e.preventDefault();
          if (pw.length < 10) return setMsg("Use at least 10 characters.");
          try {
            await updatePassword(pw);
            onDone();
          } catch (err) {
            setMsg((err as Error).message);
          }
        }}
      >
        <h1>Set a new password</h1>
        <label>
          New password
          <input type="password" autoComplete="new-password" required value={pw} onChange={(e) => setPw(e.target.value)} />
        </label>
        {msg && <p className="admin-error">{msg}</p>}
        <button type="submit" className="admin-btn">
          Save password
        </button>
      </form>
    </div>
  );
}

function Setup() {
  return (
    <div className="admin-app admin-center">
      <div className="admin-card admin-setup">
        <h1>The portal is not connected yet</h1>
        <p>Enquiries, listings and sign-ups need the portal database. Once it exists:</p>
        <ol>
          <li>Run supabase/migrations/0001_portal.sql, then supabase/seed.sql, on the project.</li>
          <li>Put the project URL and anon key in lib/backend.ts and push.</li>
          <li>Sign up once, then add that user to the admins table.</li>
        </ol>
        <p className="admin-muted">On localhost the panel opens in demo mode.</p>
      </div>
    </div>
  );
}
