import Image from "next/image";

export function EventHero() {
  return (
    <aside className="relative isolate overflow-hidden lg:h-dvh min-h-[60vh] bg-brand-950">
      <Image
        src="/event-hero.jpg"
        alt="Special Service Kenya with Pastor Chris — packed arena with stage lights"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 42vw"
        className="object-cover object-center opacity-90"
      />

      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-900/40 via-brand-950/30 to-brand-950/85"
        aria-hidden
      />
      <div
        className="absolute inset-y-0 right-0 hidden lg:block w-24 bg-gradient-to-r from-transparent to-background"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 lg:hidden h-32 bg-gradient-to-b from-transparent to-background"
        aria-hidden
      />

      <div className="absolute top-6 left-6 right-6 lg:top-10 lg:left-10 lg:right-10 z-10">
        <Image
          src="/tfn-logo.webp"
          alt="TFN — The Fellowship Network"
          width={88}
          height={88}
          priority
          className="rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)]"
        />
        <h2 className="mt-6 font-display text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95] max-w-md drop-shadow-[0_2px_20px_rgba(15,23,43,0.5)]">
          Special Service <em className="text-brand-200">Kenya</em>
        </h2>
        <p className="mt-3 max-w-sm text-sm text-white/80">
          A move of the Spirit, live with Pastor Chris.
        </p>
      </div>
    </aside>
  );
}
