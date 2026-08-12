export default function BeachScene() {
  return (
    <section
      className="hh-screen relative isolate h-[70svh] w-full max-w-full overflow-hidden sm:h-[85svh] md:h-[100svh]"
      aria-label="Hacker House Goa beach scene"
    >
      <img
        src="/hhgoa-sunrise.png"
        alt="Illustrated Goa beach sunrise with palms and a beach hut"
        className="absolute inset-0 size-full max-w-none object-cover object-[center_40%]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hh-green/50 via-hh-green/10 to-hh-green/30" />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-6">
        <p className="text-[9px] font-bold tracking-[0.16em] text-hh-yellow sm:text-[11px]">
          GOA, INDIA · 28 — 31 OCT 2026
        </p>
        <p className="text-[9px] font-bold tracking-[0.14em] text-hh-cream/80 sm:text-[11px]">
          LESS NOISE · MORE SIGNAL
        </p>
      </div>

      <div className="absolute inset-x-0 top-[24%] z-10 flex flex-col items-center gap-2 px-4 text-center sm:top-[20%] sm:px-8">
        <p className="text-[10px] font-bold tracking-[0.2em] text-hh-yellow sm:text-xs">
          BUILD · SHIP · SUNSET
        </p>
        <p className="max-w-lg font-display text-[clamp(1.5rem,4.5vw,2.8rem)] font-black leading-[0.95] text-hh-cream">
          OCEAN AT YOUR DOORSTEP.
          <br />
          FRAME READY.
        </p>
      </div>
    </section>
  );
}
