"use client";

import { useEffect, useState } from "react";

/** Saved homes live in this browser only. Every change fires EVT so the header count, the save
 * buttons and the shortlist page stay in step; `storage` keeps other tabs in step. */
const KEY = "ec-shortlist";
const EVT = "ec-shortlist";

export function readShortlist(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function toggleShortlist(slug: string) {
  const list = readShortlist();
  const next = list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug];
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode: the button still toggles for this page view */
  }
  window.dispatchEvent(new Event(EVT));
}

export function useShortlist() {
  const [list, setList] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setList(readShortlist());
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return list;
}
