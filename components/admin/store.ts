"use client";

/**
 * Where /admin reads and writes. SupabaseStore talks to the portal database (lib/backend.ts);
 * DemoStore keeps everything in this browser, seeded from the site's own listings, so the panel can be
 * tried on localhost before the database exists. Both have the same shape.
 */
import PROJECTS from "@/lib/data/projects.json";
import IMAGES from "@/lib/data/project-images.json";
import { LISTINGS } from "@/lib/listings";
import * as be from "@/lib/backend";

export type Img = { key?: string; path?: string; alt: string; url?: string };
export type PlanStep = { stage: string; pct: number };
export type ListingRow = {
  id: string;
  slug: string;
  ref: string;
  title: string;
  developer: string;
  developer_url: string;
  community: string;
  area: string | null;
  types: string[];
  status: "off-plan" | "ready";
  price: number | null;
  price_note: string | null;
  beds: number;
  beds_max: number;
  size: number | null;
  summary: string;
  description: string[];
  features: string[];
  amenities: string[];
  handover: string | null;
  plan: PlanStep[] | null;
  plan_label: string | null;
  permit: string;
  project_number: string;
  escrow: string;
  source: string;
  checked: string;
  images: Img[];
  published: boolean;
  sort: number;
  created_at?: string;
  updated_at?: string;
};
export type EnquiryStatus = "new" | "contacted" | "viewing" | "closed" | "spam";
export type Enquiry = {
  id: string;
  created_at: string;
  intent: string;
  name: string;
  phone: string;
  email: string;
  context: string;
  unit: string;
  fields: Record<string, string>;
  page: string;
  referrer: string;
  status: EnquiryStatus;
  notes: string;
};
export type Subscriber = { id: string; created_at: string; email: string; topics: string[]; page: string; status: "subscribed" | "unsubscribed" };

export interface Store {
  mode: "live" | "demo";
  user: string;
  listListings(): Promise<ListingRow[]>;
  saveListing(row: ListingRow): Promise<ListingRow>;
  deleteListing(row: ListingRow): Promise<void>;
  uploadImage(slug: string, file: File): Promise<Img>;
  imageUrl(img: Img, width?: number): string;
  listEnquiries(): Promise<Enquiry[]>;
  updateEnquiry(id: string, patch: Partial<Pick<Enquiry, "status" | "notes">>): Promise<void>;
  deleteEnquiry(id: string): Promise<void>;
  listSubscribers(): Promise<Subscriber[]>;
  updateSubscriber(id: string, patch: Partial<Pick<Subscriber, "status">>): Promise<void>;
  signOut(): Promise<void>;
}

const staticUrl = (key: string, width = 640) => {
  const spec = (IMAGES as Record<string, { widths: number[] }>)[key];
  const w = spec ? spec.widths.reduce((best, x) => (Math.abs(x - width) < Math.abs(best - width) ? x : best), spec.widths[0]) : 640;
  return `/img/${key}-${w}.jpg`;
};

const FIELDS =
  "id,slug,ref,title,developer,developer_url,community,area,types,status,price,price_note,beds,beds_max,size,summary,description,features,amenities,handover,plan,plan_label,permit,project_number,escrow,source,checked,images,published,sort,created_at,updated_at";

/* ── Live ───────────────────────────────────────────────────── */

export async function liveStore(): Promise<Store | null> {
  const s = await be.session();
  if (!s) return null;
  const token = async () => (await be.session())?.access_token ?? "";
  const admin = await be.rest<{ user_id: string }[]>(`admins?select=user_id&user_id=eq.${s.user.id}`, { token: s.access_token });
  if (!admin.length) throw new Error("not-admin");
  const strip = (row: ListingRow) => {
    const { id, created_at, updated_at, ...rest } = row;
    void created_at;
    void updated_at;
    return { id, rest: { ...rest, images: rest.images.map(({ url, ...i }) => (void url, i)) } };
  };
  return {
    mode: "live",
    user: s.user.email,
    listListings: async () => be.rest<ListingRow[]>(`listings?select=${FIELDS}&order=sort.asc,created_at.asc`, { token: await token() }),
    async saveListing(row) {
      const { id, rest } = strip(row);
      if (id) {
        const out = await be.rest<ListingRow[]>(`listings?id=eq.${id}&select=${FIELDS}`, { method: "PATCH", body: rest, token: await token(), prefer: "return=representation" });
        return out[0];
      }
      const out = await be.rest<ListingRow[]>(`listings?select=${FIELDS}`, { method: "POST", body: rest, token: await token(), prefer: "return=representation" });
      return out[0];
    },
    async deleteListing(row) {
      const t = await token();
      await be.rest(`listings?id=eq.${row.id}`, { method: "DELETE", token: t });
      for (const i of row.images) if (i.path) await be.removeObject(i.path, t);
    },
    async uploadImage(slug, file) {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
      const path = `${slug}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
      await be.upload(path, file, await token());
      return { path, alt: "" };
    },
    imageUrl: (img, width) => (img.url ? img.url : img.path ? be.publicUrl(img.path) : staticUrl(img.key || "", width)),
    listEnquiries: async () => be.rest<Enquiry[]>("enquiries?select=*&order=created_at.desc&limit=1000", { token: await token() }),
    async updateEnquiry(id, patch) {
      await be.rest(`enquiries?id=eq.${id}`, { method: "PATCH", body: patch, token: await token(), prefer: "return=minimal" });
    },
    async deleteEnquiry(id) {
      await be.rest(`enquiries?id=eq.${id}`, { method: "DELETE", token: await token() });
    },
    listSubscribers: async () => be.rest<Subscriber[]>("subscribers?select=*&order=created_at.desc&limit=5000", { token: await token() }),
    async updateSubscriber(id, patch) {
      await be.rest(`subscribers?id=eq.${id}`, { method: "PATCH", body: patch, token: await token(), prefer: "return=minimal" });
    },
    signOut: be.signOut,
  };
}

/* ── Demo ───────────────────────────────────────────────────── */

const DEMO_KEY = "ec-admin-demo";
type DemoData = { listings: ListingRow[]; enquiries: Enquiry[]; subscribers: Subscriber[] };

function seedDemo(): DemoData {
  const shown = new Set(LISTINGS.map((l) => l.slug));
  const listings: ListingRow[] = (PROJECTS as any[]).map((p, i) => ({
    id: `demo-${i}`,
    slug: p.slug,
    ref: p.ref,
    title: p.title,
    developer: p.developer,
    developer_url: p.developerUrl,
    community: p.community,
    area: p.area,
    types: p.types,
    status: p.status,
    price: p.price,
    price_note: p.priceNote,
    beds: p.beds,
    beds_max: p.bedsMax,
    size: p.size,
    summary: p.summary,
    description: p.description,
    features: p.features,
    amenities: p.amenities,
    handover: p.handover,
    plan: p.plan,
    plan_label: p.planLabel,
    permit: p.permit,
    project_number: p.projectNumber,
    escrow: p.escrow,
    source: p.source,
    checked: p.checked,
    images: (p.images as string[]).map((key) => ({ key, alt: (IMAGES as Record<string, { alt: string }>)[key]?.alt ?? "" })),
    published: shown.has(p.slug),
    sort: i,
    updated_at: new Date().toISOString(),
  }));
  const now = Date.now();
  const enquiries: Enquiry[] = [
    { id: "e1", created_at: new Date(now - 36e5).toISOString(), intent: "viewing", name: "Sample enquiry", phone: "+971 50 000 0000", email: "", context: "EC-2001, Floareá Skies, Mashriq Elite, Jumeirah Village Circle", unit: "1204", fields: { Viewing: "This week", "Paying with": "Cash" }, page: "/properties/mashriq-elite-floarea-skies/", referrer: "", status: "new", notes: "" },
    { id: "e2", created_at: new Date(now - 864e5).toISOString(), intent: "brief", name: "Sample brief", phone: "+971 55 000 0000", email: "buyer@example.com", context: "", unit: "", fields: { Budget: "AED 2M to 3M", Areas: "Dubai Islands", "Ready or off-plan": "Off-plan" }, page: "/contact/", referrer: "google.com", status: "contacted", notes: "Called, sending options." },
    { id: "e3", created_at: new Date(now - 3 * 864e5).toISOString(), intent: "valuation", name: "Sample seller", phone: "+971 52 000 0000", email: "", context: "", unit: "", fields: { Property: "2 bed, Business Bay", Selling: "Within 3 months" }, page: "/sell/", referrer: "", status: "closed", notes: "" },
  ];
  const subscribers: Subscriber[] = [{ id: "s1", created_at: new Date(now - 2 * 864e5).toISOString(), email: "reader@example.com", topics: ["Off-plan launches"], page: "/guides/", status: "subscribed" }];
  return { listings, enquiries, subscribers };
}

export function demoStore(): Store {
  let data: DemoData;
  try {
    data = JSON.parse(localStorage.getItem(DEMO_KEY) || "null") || seedDemo();
  } catch {
    data = seedDemo();
  }
  const save = () => {
    try {
      localStorage.setItem(DEMO_KEY, JSON.stringify({ ...data, listings: data.listings.map((l) => ({ ...l, images: l.images.filter((i) => !i.url?.startsWith("blob:")) })) }));
    } catch {
      /* storage full or blocked: changes last for this page */
    }
  };
  const later = <T,>(v: T) => new Promise<T>((r) => setTimeout(() => r(structuredClone(v)), 120));
  return {
    mode: "demo",
    user: "demo@expertcare.local",
    listListings: () => later(data.listings),
    async saveListing(row) {
      const out = { ...row, id: row.id || `demo-${Date.now()}`, updated_at: new Date().toISOString() };
      const i = data.listings.findIndex((l) => l.id === out.id);
      if (i >= 0) data.listings[i] = out;
      else data.listings.push(out);
      save();
      return later(out);
    },
    async deleteListing(row) {
      data.listings = data.listings.filter((l) => l.id !== row.id);
      save();
    },
    async uploadImage(_slug, file) {
      return { path: `demo/${file.name}`, alt: "", url: URL.createObjectURL(file) };
    },
    imageUrl: (img, width) => img.url || (img.key ? staticUrl(img.key, width) : ""),
    listEnquiries: () => later(data.enquiries),
    async updateEnquiry(id, patch) {
      data.enquiries = data.enquiries.map((e) => (e.id === id ? { ...e, ...patch } : e));
      save();
    },
    async deleteEnquiry(id) {
      data.enquiries = data.enquiries.filter((e) => e.id !== id);
      save();
    },
    listSubscribers: () => later(data.subscribers),
    async updateSubscriber(id, patch) {
      data.subscribers = data.subscribers.map((s) => (s.id === id ? { ...s, ...patch } : s));
      save();
    },
    async signOut() {
      try {
        localStorage.removeItem(DEMO_KEY);
      } catch {
        /* nothing stored */
      }
    },
  };
}
