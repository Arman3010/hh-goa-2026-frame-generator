import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { downloadBlob } from "../engine";
import BrandMark from "./BrandMark";
import ClosingFooter from "./ClosingFooter";

export default function ResultScreen({ result, onAdjust, onRestart }) {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    const url = URL.createObjectURL(result.blob);
    setBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [result.blob]);

  function handleDownload() {
    downloadBlob(result.blob, "hh-goa-2026.png");
  }

  function handleShareToX() {
    const text = encodeURIComponent("I'm building at HH Goa 2026! #FrameInGoa");
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  }

  return (
    <ClosingFooter>
      <div className="mx-auto flex min-h-[calc(100svh-2.75rem)] w-full max-w-[900px] flex-col items-center px-3 text-center sm:min-h-[calc(100svh-3.5rem)] sm:px-6 md:px-10">
        <header className="flex w-full flex-col items-center pt-4 sm:pt-6">
          <BrandMark compact className="origin-center" />
          <p className="mt-2 text-[8px] font-bold tracking-[0.14em] text-hh-yellow sm:text-[10px]">
            GOA, INDIA · 28 — 31 OCT 2026 · FRAME COMPLETE
          </p>
        </header>

        {/* Mid band — clear of trees/grass */}
        <div className="flex flex-1 flex-col items-center justify-center py-4 pb-[clamp(6.5rem,17vh,11rem)] sm:py-6">
          <div
            className="relative w-[clamp(14.5rem,52vw,25rem)] max-w-full border-[6px] border-hh-pink bg-hh-yellow p-1 sm:border-[10px] sm:p-2"
            style={{ boxShadow: "8px 8px 0 #03351d" }}
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap border-2 border-hh-deep bg-hh-yellow px-2 py-0.5 text-[9px] font-black text-hh-deep sm:-top-4 sm:text-[10px]">
              HH GOA &apos;26
            </span>
            {blobUrl && (
              <img
                src={blobUrl}
                alt="Your HH Goa 2026 profile frame"
                className="aspect-square w-full border-2 border-hh-deep object-cover"
              />
            )}
          </div>

          <p className="mt-6 text-[11px] font-bold tracking-[0.16em] text-hh-yellow sm:mt-7 sm:text-sm">
            YOUR PROFILE FRAME IS READY
          </p>
          <h1 className="mt-3 max-w-[12ch] font-display text-[clamp(1.85rem,4.5vw,3.75rem)] font-black leading-[0.9] text-hh-cream lg:text-[4.25rem]">
            YOU&apos;RE GOA-READY.
          </h1>
          <p className="mt-4 max-w-xl text-[14px] leading-6 text-hh-cream sm:text-lg sm:leading-8">
            Download your framed photo or share the Hacker House Goa energy with your crew.
          </p>

          <div className="mt-6 grid w-full max-w-[36rem] grid-cols-2 gap-3 sm:mt-7 sm:gap-4">
            <button
              type="button"
              onClick={handleDownload}
              className="hh-btn-shadow-pink min-h-13 border-2 border-hh-deep bg-hh-yellow px-4 py-3 text-xs font-bold text-hh-deep transition hover:-translate-y-0.5 hover:bg-[#ffe62b] focus:outline-2 focus:outline-offset-4 focus:outline-hh-pink sm:text-base"
            >
              DOWNLOAD PNG
            </button>
            <button
              type="button"
              onClick={handleShareToX}
              className="hh-btn-shadow min-h-13 border-2 border-hh-deep bg-hh-pink px-4 py-3 text-xs font-bold text-hh-cream transition hover:-translate-y-0.5 hover:bg-[#df006c] focus:outline-2 focus:outline-offset-4 focus:outline-hh-yellow sm:text-base"
            >
              SHARE TO X
            </button>
            <button
              type="button"
              onClick={onAdjust}
              className="min-h-13 border-2 border-hh-yellow bg-hh-green/90 px-4 py-3 text-xs font-bold text-hh-yellow transition hover:bg-hh-deep focus:outline-2 focus:outline-offset-4 focus:outline-hh-pink sm:text-base"
            >
              ADJUST PHOTO
            </button>
            <button
              type="button"
              onClick={onRestart}
              className="min-h-13 border-2 border-hh-cream bg-hh-cream px-4 py-3 text-xs font-bold text-hh-deep transition hover:bg-[#fff0c5] focus:outline-2 focus:outline-offset-4 focus:outline-hh-pink sm:text-base"
            >
              USE ANOTHER
            </button>
          </div>
        </div>

        <div className="w-full pb-[clamp(4.5rem,11vh,8rem)] sm:pb-[clamp(5.5rem,12vh,10rem)]">
          <div className="mx-auto inline-block bg-hh-green/80 px-6 py-4 backdrop-blur-[2px] sm:px-8 sm:py-5">
            <p className="text-[10px] font-bold tracking-[0.18em] text-hh-yellow sm:text-xs">BUILT BY</p>
            <p className="mt-1 font-display text-[clamp(1.8rem,4vw,3rem)] font-black leading-none text-hh-cream">
              DOMAIN EXPANSION
            </p>
            <p className="mt-3 text-[9px] font-bold tracking-[0.12em] text-hh-yellow sm:text-xs">
              © 2026 HH-GOA. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </ClosingFooter>
  );
}

ResultScreen.propTypes = {
  result: PropTypes.shape({
    blob: PropTypes.object.isRequired,
    zoom: PropTypes.number,
    pan: PropTypes.shape({ dx: PropTypes.number, dy: PropTypes.number }),
  }).isRequired,
  onAdjust: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
};
