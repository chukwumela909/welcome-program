export function EventMetaCard() {
  return (
    <div className="relative w-full max-w-sm rounded-2xl border border-white/40 bg-white p-5 shadow-[0_25px_70px_-15px_rgba(7,12,30,0.7)]">
      <ul className="flex flex-col gap-3">
        <li className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <PinIcon />
          </span>
          <div className="leading-tight">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-600">
              Venue
            </div>
            <div className="text-sm font-semibold text-slate-900">
              Jomo Kenyatta Int&apos;l Stadium
            </div>
            <div className="text-xs text-slate-500">
              Mamboleo · Kisumu City
            </div>
          </div>
        </li>

        <li className="h-px bg-slate-200" />

        <li className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <CalendarIcon />
          </span>
          <div className="leading-tight">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-600">
              Date &amp; Time
            </div>
            <div className="text-sm font-semibold text-slate-900">
              Saturday 6th · 3:00 PM
            </div>
            <div className="text-sm font-semibold text-slate-900">
              Sunday 7th · 4:00 PM
            </div>
          </div>
        </li>

        <li className="h-px bg-slate-200" />

        <li className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <MicIcon />
          </span>
          <div className="leading-tight">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-600">
              With
            </div>
            <div className="text-sm font-semibold text-slate-900">
              Pastor Chris
            </div>
            <div className="text-xs text-slate-500">Live in Kenya</div>
          </div>
        </li>
      </ul>
    </div>
  );
}

function PinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" />
    </svg>
  );
}
