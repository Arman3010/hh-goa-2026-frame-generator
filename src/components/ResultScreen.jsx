import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { downloadBlob } from "../engine";
import BrandMark from "./BrandMark";

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
    <section className="border-x-2 border-b-2 border-hh-yellow bg-hh-green">
      <header className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 py-5 sm:px-10 lg:px-14">
        <BrandMark />
        <p className="hidden border border-hh-yellow px-2 py-1 text-[10px] font-bold tracking-[0.15em] text-hh-yellow sm:block sm:text-xs">FRAME COMPLETE</p>
      </header>

      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 pb-14 pt-8 sm:px-10 sm:pb-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.75fr)] lg:items-center lg:gap-10 lg:px-14 lg:py-14">
        <div className="relative border-[7px] border-hh-pink bg-hh-yellow p-1 shadow-[9px_9px_0_#03351d] sm:border-[10px] sm:p-2">
          <span className="absolute -top-4 right-3 border-2 border-hh-deep bg-hh-yellow px-2 py-1 text-[10px] font-black text-hh-deep">HH GOA ’26</span>
          {blobUrl && <img src={blobUrl} alt="Your HH Goa 2026 profile frame" className="aspect-square w-full border-2 border-hh-deep object-cover" />}
        </div>

        <div className="lg:py-8 lg:text-center">
          <p className="text-xs font-bold tracking-[0.18em] text-hh-yellow">BUILT FOR YOUR NEXT PROFILE PIC</p>
          <h1 className="mt-3 font-display text-5xl font-black leading-[0.88] text-hh-cream sm:text-6xl lg:text-7xl">YOU’RE GOA-READY.</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-hh-cream/85 lg:text-lg">Download your image now, or share the HH Goa ’26 energy with your crew.</p>
          <div className="mx-auto mt-8 grid max-w-[28rem] gap-3 sm:grid-cols-2">
            <button type="button" onClick={handleDownload} className="border-2 border-hh-deep bg-hh-yellow px-5 py-4 text-sm font-black text-hh-deep shadow-[5px_5px_0_#fa0079] transition hover:-translate-y-0.5 hover:bg-[#ffe62b] focus:outline-2 focus:outline-offset-4 focus:outline-hh-pink">
              DOWNLOAD PNG
            </button>
            <button type="button" onClick={handleShareToX} className="border-2 border-hh-deep bg-hh-pink px-5 py-4 text-sm font-black text-hh-cream shadow-[5px_5px_0_#ffdd00] transition hover:-translate-y-0.5 hover:bg-[#df006c] focus:outline-2 focus:outline-offset-4 focus:outline-hh-yellow">
              SHARE TO X
            </button>
            <button type="button" onClick={onAdjust} className="border-2 border-hh-yellow bg-hh-green px-5 py-3 text-sm font-black text-hh-yellow transition hover:bg-hh-deep focus:outline-2 focus:outline-offset-4 focus:outline-hh-pink">
              ADJUST PHOTO
            </button>
            <button type="button" onClick={onRestart} className="border-2 border-hh-cream bg-hh-cream px-5 py-3 text-sm font-black text-hh-deep transition hover:bg-[#fff0c5] focus:outline-2 focus:outline-offset-4 focus:outline-hh-pink">
              USE ANOTHER PHOTO
            </button>
          </div>
        </div>
      </div>
    </section>
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
