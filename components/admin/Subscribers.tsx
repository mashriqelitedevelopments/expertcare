"use client";

import { useEffect, useState } from "react";
import type { Store, Subscriber } from "./store";
import { csv, download, when } from "./util";

export function Subscribers({ store }: { store: Store }) {
  const [rows, setRows] = useState<Subscriber[] | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    store.listSubscribers().then(setRows, (e) => setError((e as Error).message));
  }, [store]);
  if (error) return <p className="admin-error">Could not load sign-ups: {error}</p>;
  if (!rows) return <p className="admin-muted">Loading sign-ups</p>;
  const active = rows.filter((r) => r.status === "subscribed");
  return (
    <section className="admin-section">
      <div className="admin-bar">
        <h2>Newsletter</h2>
        <p className="admin-muted">{active.length} subscribed</p>
        <button
          type="button"
          className="admin-btn ghost"
          onClick={() => download(`expertcare-newsletter-${new Date().toISOString().slice(0, 10)}.csv`, csv(active.map((r) => ({ email: r.email, topics: r.topics, signed_up: r.created_at, page: r.page }))))}
        >
          Export subscribed
        </button>
      </div>
      {rows.length === 0 ? (
        <p className="admin-empty">No sign-ups yet. The market note form on the home page and every guide lands here.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Signed up</th>
                <th>Email</th>
                <th>Topics</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{when(r.created_at)}</td>
                  <td>{r.email}</td>
                  <td>{r.topics.join(", ") || "-"}</td>
                  <td>
                    <button
                      type="button"
                      className={`admin-status ${r.status === "subscribed" ? "s-closed" : "s-spam"}`}
                      onClick={async () => {
                        const status = r.status === "subscribed" ? "unsubscribed" : "subscribed";
                        await store.updateSubscriber(r.id, { status });
                        setRows((x) => (x ?? []).map((y) => (y.id === r.id ? { ...y, status } : y)));
                      }}
                      title="Switch status"
                    >
                      {r.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
