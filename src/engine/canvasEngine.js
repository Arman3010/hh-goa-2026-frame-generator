export function getInitialFit(image, canvasSize = 1080) {
  const scale = Math.max(
    canvasSize / image.naturalWidth,
    canvasSize / image.naturalHeight
  );

  const offsetX =
    (canvasSize - image.naturalWidth * scale) / 2;

  const offsetY =
    (canvasSize - image.naturalHeight * scale) / 2;

  return {
    scale,
    offsetX,
    offsetY,
  };
}

export function drawPhoto(canvas, image, transform) {
  const ctx = canvas.getContext("2d");

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const {
    offsetX,
    offsetY,
    scale,
  } = transform;

  ctx.drawImage(
    image,
    offsetX,
    offsetY,
    image.naturalWidth * scale,
    image.naturalHeight * scale
  );
}

export async function drawFrame(canvas, frameImageUrl) {
  const ctx = canvas.getContext("2d");

  const frameImage = await new Promise(
    (resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(img);

      img.onerror = () =>
        reject(
          new Error("The frame image could not be loaded.")
        );

      img.src = frameImageUrl;
    }
  );

  ctx.drawImage(
    frameImage,
    0,
    0,
    canvas.width,
    canvas.height
  );
}