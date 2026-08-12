import PropTypes from "prop-types";

/**
 * Final-state composition shell. Artwork is absolutely positioned so it
 * frames the result without adding a second page below it.
 */
export default function ClosingFooter({ children }) {
  return (
    <section
      className="hh-screen relative isolate min-h-[calc(100svh-2.75rem)] overflow-x-clip overflow-y-auto sm:min-h-[calc(100svh-3.5rem)]"
      aria-label="Your completed Hacker House Goa frame"
    >
      <img
        src="/hhgoa-footer-trees.png"
        alt=""
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-auto w-full max-w-none select-none object-cover object-bottom sm:inset-0 sm:size-full sm:object-center"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-hh-green/70 via-hh-green/35 to-hh-green/15" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[42%] bg-gradient-to-t from-hh-green/55 via-hh-green/20 to-transparent" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

ClosingFooter.propTypes = {
  children: PropTypes.node.isRequired,
};
