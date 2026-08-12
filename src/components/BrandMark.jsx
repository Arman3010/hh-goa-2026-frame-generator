import PropTypes from "prop-types";

export default function BrandMark({ className = "", compact = false }) {
  return (
    <div
      className={`relative shrink-0 ${
        compact
          ? "h-9 w-[11.5rem] sm:h-10 sm:w-[13.5rem]"
          : "h-10 w-[13rem] sm:h-12 sm:w-[18rem] md:h-14 md:w-[20rem]"
      } ${className}`}
      aria-label="Hacker House Goa"
    >
      <img
        src="/hhgoa-hacker-house.png"
        alt="Hacker House"
        className="absolute inset-0 size-full object-contain object-left"
      />
      <img
        src="/hhgoa-goa-hindi.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[43%] top-[1%] z-10 h-[72%] w-auto max-w-[34%] object-contain"
      />
    </div>
  );
}

BrandMark.propTypes = {
  className: PropTypes.string,
  compact: PropTypes.bool,
};
