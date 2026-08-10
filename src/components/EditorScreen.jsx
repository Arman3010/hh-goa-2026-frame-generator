import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { drawPhoto, drawFrame, canvasToBlob } from "../engine";
import { computeTransform, clampZoom } from "../utils/transform";
import BrandMark from "./BrandMark";

// Member 3 owns the final frame artwork. Keep this hand-off path unchanged.
const FRAME_URL = "/test-frame.svg";
const CANVAS_SIZE = 1080;

export default function EditorScreen({ image, initialZoom = 1, initialPan = { dx: 0, dy: 0 }, onDone }) {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(initialZoom);
  const [pan, setPan] = useState(initialPan);
  const dragState = useRef(null);

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const transform = computeTransform(image, zoom, pan, CANVAS_SIZE);
    drawPhoto(canvasRef.current, image, transform);
    drawFrame(canvasRef.current, FRAME_URL);
  }, [image, zoom, pan]);

  function handlePointerDown(event) {
    dragState.current = { startX: event.clientX, startY: event.clientY, pan };
  }

  function handlePointerMove(event) {
    if (!dragState.current) return;
    const { startX, startY, pan: startPan } = dragState.current;
    setPan({
      dx: startPan.dx + (event.clientX - startX),
      dy: startPan.dy + (event.clientY - startY),
    });
  }

  function handlePointerUp() {
    dragState.current = null;
  }

  function handleReset() {
    setZoom(1);
    setPan({ dx: 0, dy: 0 });
  }

  async function handleContinue() {
    const blob = await canvasToBlob(canvasRef.current);
    onDone({ blob, zoom, pan });
  }

  return (
    <section className="border-x-2 border-b-2 border-hh-yellow bg-hh-green">
      <header className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 py-5 sm:px-10 lg:px-14">
        <BrandMark />
        <p className="hidden border border-hh-yellow px-2 py-1 text-[10px] font-bold tracking-[0.15em] text-hh-yellow sm:block sm:text-xs">FRAME STUDIO · 02</p>
      </header>

      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 pb-14 pt-8 sm:px-10 sm:pb-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:items-center lg:gap-10 lg:px-14 lg:py-14">
        <div className="relative border-[7px] border-hh-yellow bg-hh-pink p-1 shadow-[9px_9px_0_#03351d] sm:border-[10px] sm:p-2">
          <span className="absolute -top-4 left-3 border-2 border-hh-deep bg-hh-pink px-2 py-1 text-[10px] font-black text-hh-cream sm:left-5">LIVE FRAME PREVIEW</span>
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="aspect-square w-full cursor-grab touch-none border-2 border-hh-deep bg-hh-cream active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            aria-label="Photo editor. Drag the image to position it."
          />
        </div>

        <div className="lg:py-8 lg:text-center">
          <p className="text-xs font-bold tracking-[0.18em] text-hh-yellow">POSITION YOUR PHOTO</p>
          <h1 className="mt-3 font-display text-5xl font-black leading-[0.88] text-hh-cream sm:text-6xl lg:text-7xl">MAKE IT FEEL LIKE YOU.</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-hh-cream/85 lg:text-lg">Drag the photo to centre yourself, then use the zoom control. Your final image stays square and ready for a profile picture.</p>

          <div className="hh-paper-shadow mt-8 mx-auto max-w-[28rem] border-2 border-hh-yellow bg-hh-cream p-5 text-hh-deep sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="zoom" className="font-display text-2xl font-black">ZOOM</label>
              <span className="border border-hh-deep bg-hh-yellow px-2 py-1 text-sm font-black">{Math.round(zoom * 100)}%</span>
            </div>
            <input
              id="zoom"
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={zoom}
              onChange={(event) => setZoom(clampZoom(Number(event.target.value)))}
              className="mt-5 w-full cursor-pointer"
              aria-label="Zoom"
            />
          </div>

          <div className="mt-6 mx-auto grid max-w-[28rem] gap-3">
            <button type="button" onClick={handleContinue} className="border-2 border-hh-deep bg-hh-pink px-5 py-4 text-sm font-black text-hh-cream shadow-[5px_5px_0_#fee101] transition hover:-translate-y-0.5 hover:bg-[#df006c] focus:outline-2 focus:outline-offset-4 focus:outline-hh-yellow">
              CONTINUE →
            </button>
            <button type="button" onClick={handleReset} className="border-2 border-hh-yellow bg-hh-green px-5 py-3 text-sm font-black text-hh-yellow transition hover:bg-hh-deep focus:outline-2 focus:outline-offset-4 focus:outline-hh-pink">
              RESET PHOTO
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

EditorScreen.propTypes = {
  image: PropTypes.shape({
    naturalWidth: PropTypes.number.isRequired,
    naturalHeight: PropTypes.number.isRequired,
  }).isRequired,
  initialZoom: PropTypes.number,
  initialPan: PropTypes.shape({
    dx: PropTypes.number.isRequired,
    dy: PropTypes.number.isRequired,
  }),
  onDone: PropTypes.func.isRequired,
};
