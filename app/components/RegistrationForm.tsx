"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { registerForEvent, type RegistrationState } from "../actions";
import { ConfirmationView } from "./ConfirmationView";

const INITIAL: RegistrationState = { status: "idle" };

const COUNTRIES = [
  "Kenya",
  "Nigeria",
  "Ghana",
  "Uganda",
  "Tanzania",
  "Rwanda",
  "South Africa",
  "United Kingdom",
  "United States",
  "Canada",
  "Other",
];

export function RegistrationForm() {
  const [state, formAction] = useActionState(registerForEvent, INITIAL);
  const [attending, setAttending] = useState(1);
  const [participation, setParticipation] = useState<"on-site" | "online">(
    "on-site",
  );

  if (state.status === "success") {
    return (
      <ConfirmationView
        firstName={state.firstName}
        attending={state.attending}
      />
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <Field
        name="fullName"
        label="Full name"
        autoComplete="name"
        placeholder="Jane Doe"
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
        <Field
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          placeholder="+254 712 345 678"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SelectField name="country" label="Country" options={COUNTRIES} required />
        <Field
          name="church"
          label="Home church"
          autoComplete="organization"
          placeholder="e.g. Christ Embassy Kisumu"
          required
        />
      </div>

      <ParticipationToggle value={participation} onChange={setParticipation} />

      <Stepper value={attending} onChange={setAttending} />

      {state.status === "error" && (
        <div
          role="alert"
          className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {state.error}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/70"
      >
        {label}
        {required && <span className="ml-1 text-brand-400">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-surface-soft px-4 py-3 text-foreground placeholder:text-muted/60 outline-none transition focus:border-brand-400 focus:bg-surface-strong hover:border-border-strong"
      />
    </div>
  );
}

function SelectField({
  name,
  label,
  options,
  required,
}: {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/70"
      >
        {label}
        {required && <span className="ml-1 text-brand-400">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          defaultValue=""
          className="w-full appearance-none rounded-xl border border-border bg-surface-soft px-4 py-3 pr-10 text-foreground outline-none transition focus:border-brand-400 focus:bg-surface-strong hover:border-border-strong"
        >
          <option value="" disabled>
            Select your country…
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

function ParticipationToggle({
  value,
  onChange,
}: {
  value: "on-site" | "online";
  onChange: (v: "on-site" | "online") => void;
}) {
  const options: Array<{
    value: "on-site" | "online";
    label: string;
    hint: string;
  }> = [
    { value: "on-site", label: "On-site", hint: "Join us at the stadium" },
    { value: "online", label: "Online", hint: "Stream the service live" },
  ];
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/70">
        How will you participate?
        <span className="ml-1 text-brand-400">*</span>
      </span>
      <input type="hidden" name="participation" value={value} />
      <div
        role="radiogroup"
        aria-label="Participation method"
        className="grid grid-cols-2 gap-3"
      >
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt.value)}
              className={
                "flex flex-col items-start gap-0.5 rounded-xl border px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-brand-500/30 " +
                (selected
                  ? "border-brand-400 bg-brand-gradient text-white shadow-[0_10px_30px_-12px_rgba(20,71,230,0.7)]"
                  : "border-border bg-surface-soft text-foreground hover:border-border-strong hover:bg-surface-strong")
              }
            >
              <span className="text-sm font-semibold">{opt.label}</span>
              <span
                className={
                  "text-xs " + (selected ? "text-white/80" : "text-muted")
                }
              >
                {opt.hint}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Stepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const dec = () => onChange(Math.max(1, value - 1));
  const inc = () => onChange(Math.min(20, value + 1));
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/70">
        Number attending
      </span>
      <div className="flex items-center justify-between rounded-xl border border-border bg-surface-soft px-4 py-2.5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={dec}
            aria-label="Decrease"
            disabled={value <= 1}
            className="grid size-9 place-items-center rounded-lg border border-border bg-surface-strong text-foreground transition hover:border-brand-400/70 hover:text-brand-300 disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14" /></svg>
          </button>
          <input
            type="number"
            name="attending"
            min={1}
            max={20}
            value={value}
            onChange={(e) => {
              const n = Number(e.target.value);
              if (Number.isFinite(n)) onChange(Math.min(20, Math.max(1, n)));
            }}
            inputMode="numeric"
            className="w-12 bg-transparent text-center text-xl font-semibold text-foreground border-0 outline-none focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={inc}
            aria-label="Increase"
            disabled={value >= 20}
            className="grid size-9 place-items-center rounded-lg border border-border bg-surface-strong text-foreground transition hover:border-brand-400/70 hover:text-brand-300 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          </button>
        </div>
        <span className="text-sm text-muted">
          {value === 1 ? "1 guest" : `${value} guests`}
        </span>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-gradient px-6 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(20,71,230,0.7)] transition hover:shadow-[0_18px_45px_-10px_rgba(20,71,230,0.85)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-80 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-brand-500/30"
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {pending ? (
          <>
            <Spinner /> Reserving your seat…
          </>
        ) : (
          <>
            Confirm registration
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition group-hover:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </>
        )}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    </button>
  );
}

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="animate-spin"
      aria-hidden
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
