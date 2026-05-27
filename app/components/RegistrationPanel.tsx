import { RegistrationForm } from "./RegistrationForm";

export function RegistrationPanel() {
  return (
    <section className="relative isolate overflow-hidden flex items-center justify-center px-6 py-12 lg:px-14 lg:py-16 bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-20 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl"
      />

      <div className="relative w-full max-w-xl animate-in fade-in slide-in-from-bottom-3 duration-500">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-brand-400 animate-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-300">
            Registration Open
          </span>
        </div>

        <h1 className="mt-5 font-display text-5xl sm:text-6xl leading-[0.95] text-foreground">
          Reserve your{" "}
          <em className="not-italic text-brand-gradient">seat</em>
        </h1>

        <p className="mt-4 max-w-md text-muted leading-relaxed">
          Join thousands across Kenya and beyond for a Special Service with
          Pastor Chris. Fill in your details below — we&apos;ll save your spot.
        </p>

        <div className="mt-10">
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}
