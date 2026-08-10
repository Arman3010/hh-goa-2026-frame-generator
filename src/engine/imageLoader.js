import { heicTo } from "heic-to";

export async function loadImageFile(file) {
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

  const imageUrl = URL.createObjectURL(workingFile);

  try {
    const image = await new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        resolve(img);
      };

      img.onerror = () => {
        reject(
          new Error("The browser could not decode this image.")
        );
      };

      img.src = imageUrl;
    });

    return image;
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}