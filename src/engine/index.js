import { loadImageFile } from "./imageLoader";
import {
  getInitialFit,
  drawPhoto,
  drawFrame,
  drawFramedCanvas,
  loadFrameImage,
} from "./canvasEngine";
import { canvasToBlob, downloadBlob } from "./exportImage";
import { FRAME_CONFIG } from "../image/frameConfig";

export async function generateFramedImage(
  file,
  transform,
  frameImageUrl = FRAME_CONFIG.frameUrl,
  exportSize = FRAME_CONFIG.canvasSize || 1080,
  config = FRAME_CONFIG
) {
  const imageBitmap = await loadImageFile(file);
  const frameImg = frameImageUrl ? await loadFrameImage(frameImageUrl) : null;

  const canvas = document.createElement("canvas");

  canvas.width = exportSize;
  canvas.height = exportSize;

  const finalTransform =
    transform || getInitialFit(imageBitmap, exportSize);

  drawFramedCanvas(canvas, imageBitmap, finalTransform, frameImg, config);

  return canvasToBlob(canvas);
}

export {
  loadImageFile,
  getInitialFit,
  drawPhoto,
  drawFrame,
  drawFramedCanvas,
  loadFrameImage,
  canvasToBlob,
  downloadBlob,
};
