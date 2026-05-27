"use client";

const ICS_URL = (() => {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TFN Fellowship//Special Service Kenya//EN",
    "BEGIN:VEVENT",
    "UID:tfn-special-service-saturday@tfn",
    "SUMMARY:Special Service Kenya with Pastor Chris (Saturday)",
    "LOCATION:Jomo Kenyatta International Stadium, Mamboleo, Kisumu",
    "DTSTART:20260606T120000Z",
    "DTEND:20260606T150000Z",
    "END:VEVENT",
    "BEGIN:VEVENT",
    "UID:tfn-special-service-sunday@tfn",
    "SUMMARY:Special Service Kenya with Pastor Chris (Sunday)",
    "LOCATION:Jomo Kenyatta International Stadium, Mamboleo, Kisumu",
    "DTSTART:20260607T130000Z",
    "DTEND:20260607T160000Z",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
})();

export function ConfirmationView({
  firstName,
  attending,
}: {
  firstName: string;
  attending: number;
}) {
  return (
    <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
      <CheckBadge />

      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-300">
          Seat reserved
        </span>
      </div>

      <h2 className="mt-4 font-display text-5xl sm:text-6xl leading-[0.95] text-foreground">
        See you in Kisumu,
        <br />
        <em className="not-italic text-brand-gradient">{firstName}</em>
      </h2>

      <p className="mt-5 max-w-md text-muted leading-relaxed">
        {attending > 1
          ? `Your group of ${attending} is registered for the Special Service.`
          : "Your place is registered for the Special Service."}{" "}
        We can&apos;t wait to worship with you.
      </p>

      <div className="mt-8 grid w-full max-w-sm grid-cols-2 gap-3">
        <DetailCard label="Saturday" value="6th · 3:00 PM" />
        <DetailCard label="Sunday" value="7th · 4:00 PM" />
      </div>
      <div className="mt-3 w-full max-w-sm">
        <DetailCard label="Venue" value="Mamboleo Stadium, Kisumu" />
      </div>

      <a
        href={ICS_URL}
        download="special-service-kenya.ics"
        className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border bg-surface-soft px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-brand-400/60 hover:text-brand-300 hover:bg-brand-500/10 focus:outline-none focus:ring-4 focus:ring-brand-500/20"
      >
        <DownloadIcon /> Add to calendar
      </a>
    </div>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-soft px-4 py-3 text-left">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-300">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}

function CheckBadge() {
  return (
    <div className="relative grid size-20 place-items-center">
      <div
        aria-hidden
        className="absolute inset-0 rounded-full bg-brand-gradient blur-2xl opacity-50"
      />
      <div className="relative grid size-20 place-items-center rounded-full bg-brand-gradient shadow-[0_15px_40px_-10px_rgba(20,71,230,0.7)]">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 4v12m0 0 4-4m-4 4-4-4M5 20h14" />
    </svg>
  );
}
