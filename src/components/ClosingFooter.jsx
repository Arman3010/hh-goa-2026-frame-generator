import BrandMark from "./BrandMark";

export default function ClosingFooter() {
  return (
    <footer className="relative isolate aspect-[16/9] min-h-[430px] w-full max-w-full overflow-hidden border-x-2 border-hh-yellow bg-hh-green" aria-label="Project credits">
      <img
        src="/hhgoa-footer-trees.png"
        alt=""
        className="pointer-events-none absolute inset-0 z-[-1] size-full object-cover object-center select-none"
      />
      <div className="absolute inset-0 z-[-1] bg-hh-green/15" />

      <div className="relative z-10 mx-auto flex size-full max-w-4xl flex-col items-center px-5 py-10 text-center sm:px-10 sm:py-14">
        <div className="rounded-2xl border border-hh-yellow/50 bg-hh-deep/70 px-6 py-5 shadow-[0_0_0_2px_rgba(255,255,255,0.08)] backdrop-blur-sm">
          <BrandMark />
          <p className="mt-5 text-[10px] font-bold tracking-[0.16em] text-hh-yellow sm:text-xs">GOA, INDIA · 28 — 31 OCT 2026</p>
          <p className="mt-2 text-[10px] font-bold tracking-[0.16em] text-hh-yellow">2:47 PM STUDIO</p>
        </div>

        <div className="mt-auto mb-1 border-l-2 border-hh-pink px-5 py-1 text-left">
          <p className="text-[10px] font-bold tracking-[0.18em] text-hh-yellow">BUILT BY</p>
          <p className="mt-1 font-display text-xl font-black text-hh-cream sm:text-3xl">DOMAIN EXPANSION</p>
        </div>
        <p className="mt-6 text-[10px] font-bold tracking-[0.13em] text-hh-yellow sm:text-xs">© 2026 HH-GOA. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}
