import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { drawFramedCanvas, loadFrameImage, canvasToBlob } from "../engine";
import { clampPan, clampZoom, computeTransform, panForZoom } from "../utils/transform";
import BrandMark from "./BrandMark";
import { FRAME_CONFIG } from "../image/frameConfig";

const CANVAS_SIZE = FRAME_CONFIG.canvasSize || 1080;

export default function EditorScreen({ image, initialZoom = 1, initialPan = { dx: 0, dy: 0 }, onDone }) {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(initialZoom);
  const [pan, setPan] = useState(initialPan);
  const [frameImage, setFrameImage] = useState(null);
  const dragState = useRef(null);

  useEffect(() => {
    let isMounted = true;
    if (FRAME_CONFIG.frameUrl) {
      loadFrameImage(FRAME_CONFIG.frameUrl)
        .then((img) => {
          if (isMounted) setFrameImage(img);
        })
        .catch((err) => console.error("Failed to load frame:", err));
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setPan((currentPan) => clampPan(image, zoom, currentPan, CANVAS_SIZE));
  }, [image, zoom]);

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const transform = computeTransform(image, zoom, pan, CANVAS_SIZE);
    drawFramedCanvas(canvasRef.current, image, transform, frameImage, FRAME_CONFIG);
  }, [image, zoom, pan, frameImage]);


  function handlePointerDown(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      pan,
      scaleX: CANVAS_SIZE / bounds.width,
      scaleY: CANVAS_SIZE / bounds.height,
    };
  }

  function handlePointerMove(event) {
    if (!dragState.current || dragState.current.pointerId !== event.pointerId) return;
    const { startX, startY, pan: startPan, scaleX, scaleY } = dragState.current;
    setPan(
      clampPan(
        image,
        zoom,
        {
          dx: startPan.dx + (event.clientX - startX) * scaleX,
          dy: startPan.dy + (event.clientY - startY) * scaleY,
        },
        CANVAS_SIZE
      )
    );
  }

  function handlePointerUp(event) {
    if (dragState.current?.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragState.current = null;
  }

  function handleZoomChange(event) {
    const nextZoom = clampZoom(Number(event.target.value));
    setPan((currentPan) =>
      clampPan(image, nextZoom, panForZoom(currentPan, zoom, nextZoom), CANVAS_SIZE)
    );
    setZoom(nextZoom);
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
    <section className="hh-screen flex min-h-[calc(100svh-2.75rem)] flex-col sm:min-h-[calc(100svh-3.5rem)]">
      <header className="flex w-full items-center justify-between gap-3 border-b-2 border-hh-yellow/40 px-3 py-3 sm:px-6 sm:py-4 md:px-10">
        <BrandMark compact />
        <p className="shrink-0 border border-hh-yellow px-2 py-1 text-[9px] font-bold tracking-[0.12em] text-hh-yellow sm:text-[11px]">
          FRAME STUDIO · 02
        </p>
      </header>

      <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center gap-6 px-3 py-5 sm:gap-8 sm:px-6 sm:py-8 md:px-10 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
        <div
          className="relative mx-auto w-full max-w-[min(100%,26rem)] border-[6px] border-hh-yellow bg-hh-pink p-1 sm:max-w-[min(100%,34rem)] sm:border-[10px] sm:p-2 lg:justify-self-start"
          style={{ boxShadow: "8px 8px 0 #03351d" }}
        >
          <span className="absolute -top-3 left-2 z-10 border-2 border-hh-deep bg-hh-pink px-2 py-0.5 text-[9px] font-black text-hh-cream sm:-top-4 sm:left-4 sm:text-[10px]">
            LIVE FRAME PREVIEW
          </span>
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="aspect-square w-full cursor-grab touch-none border-2 border-hh-deep bg-hh-cream active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onLostPointerCapture={() => {
              dragState.current = null;
            }}
            aria-label="Photo editor. Drag the image to position it."
          />
        </div>

        <div className="mx-auto w-full max-w-[28rem] pb-4 lg:pb-0 lg:text-center">
          <p className="text-[10px] font-bold tracking-[0.16em] text-hh-yellow sm:text-xs">
            POSITION YOUR PHOTO
          </p>
          <h1 className="mt-2 font-display text-[clamp(2.2rem,6vw,4.2rem)] font-black leading-[0.88] text-hh-cream">
            MAKE IT FEEL LIKE YOU.
          </h1>
          <p className="mt-3 text-[13px] leading-6 text-hh-cream/85 sm:mt-4 sm:text-base sm:leading-7">
            Drag the photo to centre yourself, then use the zoom control. Your final image stays square and ready for a profile picture.
          </p>

          <div className="hh-paper-shadow mt-5 border-2 border-hh-yellow bg-hh-cream p-4 text-hh-deep sm:mt-6 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="zoom" className="font-display text-xl font-black sm:text-2xl">
                ZOOM
              </label>
              <span className="border border-hh-deep bg-hh-yellow px-2 py-1 text-sm font-black">
                {Math.round(zoom * 100)}%
              </span>
            </div>
            <input
              id="zoom"
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={zoom}
              onChange={handleZoomChange}
              className="mt-4 w-full cursor-pointer"
              aria-label="Zoom"
            />
          </div>

          <div className="mt-4 grid gap-3 sm:mt-5">
            <button
              type="button"
              onClick={handleContinue}
              className="hh-btn-shadow min-h-12 border-2 border-hh-deep bg-hh-pink px-5 py-3 text-sm font-bold text-hh-cream transition hover:-translate-y-0.5 hover:bg-[#df006c] focus:outline-2 focus:outline-offset-4 focus:outline-hh-yellow"
            >
              CONTINUE →
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="min-h-12 border-2 border-hh-yellow bg-hh-green px-5 py-3 text-sm font-bold text-hh-yellow transition hover:bg-hh-deep focus:outline-2 focus:outline-offset-4 focus:outline-hh-pink"
            >
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
