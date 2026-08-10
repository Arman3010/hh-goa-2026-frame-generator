export function canvasToBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob),
      "image/png",
      0.95
    );
  });
}

export function downloadBlob(
  blob,
  filename = "hh-goa-2026.png"
) {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}