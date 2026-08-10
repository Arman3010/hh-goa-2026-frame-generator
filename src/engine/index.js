import { loadImageFile } from "./imageLoader";
import {
  getInitialFit,
  drawPhoto,
  drawFrame,
} from "./canvasEngine";
import { canvasToBlob } from "./exportImage";

export async function generateFramedImage(
  file,
  transform,
  frameImageUrl,
  exportSize = 1080
) {
  const imageBitmap = await loadImageFile(file);

  const canvas = document.createElement("canvas");

  canvas.width = exportSize;
  canvas.height = exportSize;

  const finalTransform =
    transform ||
    getInitialFit(imageBitmap, exportSize);

  drawPhoto(
    canvas,
    imageBitmap,
    finalTransform
  );

  await drawFrame(
    canvas,
    frameImageUrl
  );

  return canvasToBlob(canvas);
}

export {
  loadImageFile,
  getInitialFit,
  drawPhoto,
  drawFrame,
};