import { heicTo } from "heic-to";
import { getExifOrientation } from "./exifOrientation";

function loadImageFromBlob(blob) {
  const imageUrl = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(imageUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error("The browser could not decode this image."));
    };
    image.src = imageUrl;
  });
}

async function normalizeOrientation(image, orientation) {
  if (orientation < 2 || orientation > 8) return image;

  const isSideways = [5, 6, 7, 8].includes(orientation);
  const sourceWidth = image.naturalWidth;
  const sourceHeight = image.naturalHeight;
  const canvas = document.createElement("canvas");

  canvas.width = isSideways ? sourceHeight : sourceWidth;
  canvas.height = isSideways ? sourceWidth : sourceHeight;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser could not prepare this image.");

  switch (orientation) {
    case 2:
      context.transform(-1, 0, 0, 1, sourceWidth, 0);
      break;
    case 3:
      context.transform(-1, 0, 0, -1, sourceWidth, sourceHeight);
      break;
    case 4:
      context.transform(1, 0, 0, -1, 0, sourceHeight);
      break;
    case 5:
      context.transform(0, 1, 1, 0, 0, 0);
      break;
    case 6:
      context.transform(0, 1, -1, 0, sourceHeight, 0);
      break;
    case 7:
      context.transform(0, -1, -1, 0, sourceHeight, sourceWidth);
      break;
    case 8:
      context.transform(0, -1, 1, 0, 0, sourceWidth);
      break;
    default:
      break;
  }

  context.drawImage(image, 0, 0);

  const orientedBlob = await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Your browser could not prepare this image."));
    }, "image/jpeg", 0.95);
  });

  return loadImageFromBlob(orientedBlob);
}

export async function loadImageFile(file) {
  if (!file.type.startsWith("image/") && !/\.(heic|heif)$/i.test(file.name)) {
    throw new Error("Please choose an image file.");
  }

  let workingFile = file;

  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif");

  // Convert HEIC / HEIF to JPEG
  if (isHeic) {
    const converted = await heicTo({
      blob: file,
      type: "image/jpeg",
      quality: 0.9,
    });

    workingFile = converted;
  }

  const image = await loadImageFromBlob(workingFile);
  const orientation = await getExifOrientation(workingFile);

  return normalizeOrientation(image, orientation);
}
