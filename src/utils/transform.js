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
 * Never allow zooming out below auto-fit (zoom < 1) — that would
 * shrink the photo inside the frame and introduce empty borders,
 * which the brief explicitly disallows.
 */
export function clampZoom(zoom) {
  return Math.min(Math.max(zoom, 1), 3);
}
