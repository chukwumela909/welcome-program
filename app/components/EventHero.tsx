import Image from "next/image";

export function EventHero() {
  return (
    <aside className="relative isolate overflow-hidden bg-background lg:h-dvh lg:flex lg:flex-col">
      <div className="relative z-10 px-6 pt-6 pb-2 lg:px-10 lg:pt-10">
        <Image
          src="/tfn-logo.webp"
          alt="TFN — The Fellowship Network"
          width={72}
          height={72}
          priority
          className="rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)]"
        />
        <h2 className="mt-5 font-display text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95] max-w-md">
          Special Service <em className="text-brand-200">Kenya</em>
        </h2>
        <p className="mt-2 max-w-sm text-sm text-white/75">
          A move of the Spirit, live with Pastor Chris.
        </p>
      </div>

      <div className="relative w-full aspect-[1482/1104] lg:flex-1 lg:min-h-0 lg:aspect-auto">
        <Image
          src="/event-hero.jpg"
          alt="Special Service Kenya with Pastor Chris — packed arena with stage lights"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-contain object-top"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block w-24 bg-gradient-to-r from-transparent to-background"
        aria-hidden
      />
    </aside>
  );
}
