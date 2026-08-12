import { getInitialFit } from "../engine";

/**
 * Converts user-friendly zoom + pan values into the pixel-based
 * transform object Member 1's engine expects: { scale, offsetX, offsetY }.
 *
 * zoom: 1   = auto-fit, no zoom (matches getInitialFit exactly)
 *       >1  = zoomed in
 * pan:  { dx, dy } extra pixel offset from dragging, added on top of
 *       the auto-centered position
 *
 * This file exists because the engine only gives us the *auto-fit*
 * transform (getInitialFit). Turning "user dragged/zoomed" into a
 * transform the engine can draw is the UI side's job — this is where
 * that math lives, kept in one place so it's easy to hand off to
 * Member 1 later if the engine grows a built-in version of this.
 */
export function computeTransform(image, zoom, pan, canvasSize = 1080) {
  const base = getInitialFit(image, canvasSize);

  const scale = base.scale * zoom;

  const offsetX = (canvasSize - image.naturalWidth * scale) / 2 + pan.dx;
  const offsetY = (canvasSize - image.naturalHeight * scale) / 2 + pan.dy;

  return { scale, offsetX, offsetY };
}

/**
 * Returns the furthest distance an image may be moved from its fitted
 * position while still covering every edge of the square crop area.
 */
export function getPanBounds(image, zoom, canvasSize = 1080) {
  const base = getInitialFit(image, canvasSize);
  const scale = base.scale * clampZoom(zoom);

  return {
    maxX: Math.max(0, (image.naturalWidth * scale - canvasSize) / 2),
    maxY: Math.max(0, (image.naturalHeight * scale - canvasSize) / 2),
  };
}

/**
 * Keeps a dragged image over the entire crop area. Without this clamp, a
 * photo can be dragged far enough to expose the canvas underneath it.
 */
export function clampPan(image, zoom, pan, canvasSize = 1080) {
  const { maxX, maxY } = getPanBounds(image, zoom, canvasSize);

  return {
    dx: Math.min(Math.max(pan.dx, -maxX), maxX),
    dy: Math.min(Math.max(pan.dy, -maxY), maxY),
  };
}

/**
 * Preserve the currently selected part of the image when its scale changes.
 * Panning is stored in canvas pixels, so it must be scaled inversely with
 * zoom to keep the crop centred on the same image point.
 */
export function panForZoom(pan, previousZoom, nextZoom) {
  return {
    dx: pan.dx * (previousZoom / nextZoom),
    dy: pan.dy * (previousZoom / nextZoom),
  };
}

/**
 * Never allow zooming out below auto-fit (zoom < 1) — that would
 * shrink the photo inside the frame and introduce empty borders,
 * which the brief explicitly disallows.
 */
export function clampZoom(zoom) {
  return Math.min(Math.max(zoom, 1), 3);
}
