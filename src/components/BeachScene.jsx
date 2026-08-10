export default function BeachScene() {
  return (
    <div className="relative z-0 w-full overflow-hidden border-x-2 border-hh-yellow bg-hh-green" aria-hidden="true">
      <img
        src="/hhgoa-sunrise.png"
        alt=""
        className="block h-auto w-full"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hh-green/20 via-transparent to-hh-green/10" />
    </div>
  );
}
