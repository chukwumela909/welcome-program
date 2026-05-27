import { getAllRegistrations } from "@/lib/db";

export const dynamic = "force-dynamic";

function csvEscape(value: string | number): string {
  const s = String(value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET() {
  const rows = getAllRegistrations();
  const header = [
    "id",
    "received_at",
    "full_name",
    "email",
    "phone",
    "country",
    "church",
    "participation",
    "attending",
  ];
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(
      [
        r.id,
        r.received_at,
        r.full_name,
        r.email,
        r.phone,
        r.country,
        r.church,
        r.participation,
        r.attending,
      ]
        .map(csvEscape)
        .join(","),
    );
  }
  const body = lines.join("\r\n") + "\r\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="registrations-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
