import {
  getAllRegistrations,
  getBreakdown,
  getDailyCounts,
  getTotals,
  type BreakdownRow,
  type DailyCountRow,
} from "@/lib/db";
import { RegistrationsTable } from "./RegistrationsTable";

export const dynamic = "force-dynamic";

export default function DashboardAdminPage() {
  const totals = getTotals();
  const byCountry = getBreakdown("country");
  const byChurch = getBreakdown("church");
  const daily = getDailyCounts();
  const all = getAllRegistrations();

  return (
    <div className="flex flex-col gap-10">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <KpiCard label="Total registrations" value={totals.count} />
        <KpiCard label="Total attendees" value={totals.attendees} />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BreakdownPanel title="By country" rows={byCountry} />
        <BreakdownPanel title="By church" rows={byChurch} />
      </section>

      <section className="rounded-xl border border-border bg-surface-soft p-6">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted">
          Registrations over time
        </h2>
        <DailyChart rows={daily} />
      </section>

      <section className="rounded-xl border border-border bg-surface-soft p-6">
        <RegistrationsTable rows={all} />
      </section>
    </div>
  );
}

function KpiCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-surface-soft p-6">
      <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-3 font-display text-5xl tracking-tight">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

function BreakdownPanel({
  title,
  rows,
}: {
  title: string;
  rows: BreakdownRow[];
}) {
  const max = rows.reduce((m, r) => Math.max(m, r.count), 0);
  return (
    <div className="rounded-xl border border-border bg-surface-soft p-6">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted">
        {title}
      </h2>
      {rows.length === 0 ? (
        <p className="text-sm text-muted">No data yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {rows.map((row) => {
            const pct = max > 0 ? (row.count / max) * 100 : 0;
            return (
              <li key={row.key} className="text-sm">
                <div className="mb-1 flex justify-between gap-4">
                  <span className="truncate">{row.key}</span>
                  <span className="shrink-0 text-muted">
                    {row.count} reg · {row.attendees} att
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-surface-strong">
                  <div
                    className="h-full rounded-full bg-brand-gradient"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function DailyChart({ rows }: { rows: DailyCountRow[] }) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted">No data yet.</p>;
  }
  const max = rows.reduce((m, r) => Math.max(m, r.count), 0);
  const width = 800;
  const height = 200;
  const padding = 24;
  const barGap = 6;
  const barWidth =
    rows.length > 0
      ? Math.max(
          4,
          (width - padding * 2 - barGap * (rows.length - 1)) / rows.length,
        )
      : 0;

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-48 w-full min-w-[600px]"
        role="img"
        aria-label="Daily registrations"
      >
        {rows.map((row, i) => {
          const h =
            max > 0 ? ((row.count / max) * (height - padding * 2)) : 0;
          const x = padding + i * (barWidth + barGap);
          const y = height - padding - h;
          return (
            <g key={row.day}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={h}
                rx={3}
                fill="url(#barGrad)"
              />
              <text
                x={x + barWidth / 2}
                y={height - 6}
                textAnchor="middle"
                fontSize="10"
                fill="currentColor"
                className="text-muted"
                opacity={0.7}
              >
                {row.day.slice(5)}
              </text>
              <text
                x={x + barWidth / 2}
                y={y - 4}
                textAnchor="middle"
                fontSize="10"
                fill="currentColor"
                opacity={0.9}
              >
                {row.count}
              </text>
            </g>
          );
        })}
        <defs>
          <linearGradient id="barGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#90c5ff" />
            <stop offset="100%" stopColor="#1447e6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
