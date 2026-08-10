export default function BrandMark() {
  return (
    <div className="relative h-11 w-[15rem] shrink-0 sm:h-15 sm:w-[21rem]" aria-label="Hacker House Goa">
      <img
        src="/hhgoa-hacker-house.png"
        alt="Hacker House"
        className="absolute left-0 top-1/2 h-10 w-auto -translate-y-1/2 sm:h-14"
      />
      <img
        src="/hhgoa-goa-hindi.svg"
        alt="Goa"
        className="absolute left-[5rem] top-[0.15rem] h-5 w-auto object-contain sm:left-[7.4rem] sm:top-[0.25rem] sm:h-7"
      />
    </div>
  );
}
