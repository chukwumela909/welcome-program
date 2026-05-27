"use client";

import { useMemo, useState } from "react";
import type { RegistrationRow } from "@/lib/db";

export function RegistrationsTable({ rows }: { rows: RegistrationRow[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.full_name, r.email, r.country, r.church, r.phone].some((v) =>
        v.toLowerCase().includes(q),
      ),
    );
  }, [rows, query]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
          Registrations ({filtered.length})
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, country, church…"
            className="w-72 rounded-md border border-border bg-surface-strong px-3 py-2 text-sm outline-none focus:border-border-strong"
          />
          <a
            href="/dashboard-admin/export"
            className="rounded-md border border-border bg-surface-strong px-4 py-2 text-sm font-medium"
          >
            Download CSV
          </a>
          <a
            href="/dashboard-admin/export-pdf"
            className="rounded-md bg-brand-gradient px-4 py-2 text-sm font-medium text-white"
          >
            Download PDF
          </a>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full text-sm">
          <thead className="bg-surface-strong text-left text-xs uppercase tracking-widest text-muted">
            <tr>
              <th className="px-3 py-2">When</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Country</th>
              <th className="px-3 py-2">Church</th>
              <th className="px-3 py-2 text-right">Att.</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-muted">
                  {rows.length === 0
                    ? "No registrations yet."
                    : "No matches for that search."}
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-border align-top"
                >
                  <td className="whitespace-nowrap px-3 py-2 text-muted">
                    {new Date(r.received_at).toLocaleString()}
                  </td>
                  <td className="px-3 py-2">{r.full_name}</td>
                  <td className="px-3 py-2">{r.email}</td>
                  <td className="whitespace-nowrap px-3 py-2">{r.phone}</td>
                  <td className="px-3 py-2">{r.country}</td>
                  <td className="px-3 py-2">{r.church}</td>
                  <td className="px-3 py-2 text-right">{r.attending}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
