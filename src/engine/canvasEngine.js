import { FRAME_CONFIG } from "../image/frameConfig";

const frameImageCache = new Map();

export function loadFrameImage(frameImageUrl) {
  if (!frameImageUrl) return Promise.resolve(null);
  if (frameImageCache.has(frameImageUrl)) {
    return frameImageCache.get(frameImageUrl);
  }

  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error("The frame image could not be loaded."));
    img.src = frameImageUrl;
  });

  frameImageCache.set(frameImageUrl, promise);
  return promise;
}

export function getInitialFit(image, canvasSize = 1080) {
  const scale = Math.max(
    canvasSize / image.naturalWidth,
    canvasSize / image.naturalHeight
  );

  const offsetX = (canvasSize - image.naturalWidth * scale) / 2;
  const offsetY = (canvasSize - image.naturalHeight * scale) / 2;

  return {
    scale,
    offsetX,
    offsetY,
  };
}

export function drawFramedCanvas(
  canvas,
  image,
  transform,
  frameImage,
  config = FRAME_CONFIG
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const photoArea = config?.photoArea;
  const { offsetX, offsetY, scale } = transform;

  // 1. Create clipping path
  ctx.save();
  ctx.beginPath();

  if (photoArea?.shape === "circle") {
    const { centerX, centerY, radius } = photoArea;
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  } else if (photoArea?.shape === "rect") {
    const { x, y, width, height } = photoArea;
    ctx.rect(x, y, width, height);
  } else {
    ctx.rect(0, 0, canvas.width, canvas.height);
  }

  ctx.clip();

  // 2. Draw the positioned/scaled user photo inside the clip
  ctx.drawImage(
    image,
    offsetX,
    offsetY,
    image.naturalWidth * scale,
    image.naturalHeight * scale
  );

  // 3. Restore canvas
  ctx.restore();

  // 4. Draw the future HH Goa frame overlay on top
  if (frameImage) {
    ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
  }

  // 5. Draw any badge/decorations
}

export function drawPhoto(canvas, image, transform) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const { offsetX, offsetY, scale } = transform;

  ctx.drawImage(
    image,
    offsetX,
    offsetY,
    image.naturalWidth * scale,
    image.naturalHeight * scale
  );
}

export async function drawFrame(canvas, frameImageUrl) {
  const frameImage = await loadFrameImage(frameImageUrl);
  const ctx = canvas.getContext("2d");
  if (!ctx || !frameImage) return;

  ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
}