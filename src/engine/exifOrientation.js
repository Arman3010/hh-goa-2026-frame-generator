// Reads the JPEG EXIF orientation tag (0x0112) without adding a new library.
// Non-JPEG images and files without the tag are already upright.
export async function getExifOrientation(file) {
  const isJpeg =
    file.type === "image/jpeg" ||
    /\.jpe?g$/i.test(file.name);

  if (!isJpeg) return 1;

  try {
    const buffer = await file.slice(0, 64 * 1024).arrayBuffer();
    const view = new DataView(buffer);

    if (view.byteLength < 4 || view.getUint16(0, false) !== 0xffd8) return 1;

    let offset = 2;
    while (offset + 4 <= view.byteLength) {
      const marker = view.getUint16(offset, false);
      offset += 2;

      if (marker === 0xffda || marker === 0xffd9) break;

      const segmentLength = view.getUint16(offset, false);
      if (segmentLength < 2 || offset + segmentLength > view.byteLength) break;

      if (
        marker === 0xffe1 &&
        view.getUint32(offset + 2, false) === 0x45786966 &&
        view.getUint16(offset + 6, false) === 0
      ) {
        const tiffOffset = offset + 8;
        const littleEndian = view.getUint16(tiffOffset, false) === 0x4949;
        const firstIfdOffset = view.getUint32(tiffOffset + 4, littleEndian);
        const ifdOffset = tiffOffset + firstIfdOffset;

        if (ifdOffset + 2 > view.byteLength) return 1;

        const entryCount = view.getUint16(ifdOffset, littleEndian);
        for (let entry = 0; entry < entryCount; entry += 1) {
          const entryOffset = ifdOffset + 2 + entry * 12;
          if (entryOffset + 12 > view.byteLength) return 1;

          if (view.getUint16(entryOffset, littleEndian) === 0x0112) {
            return view.getUint16(entryOffset + 8, littleEndian);
          }
        }
      }

      offset += segmentLength;
    }
  } catch {
    // If EXIF cannot be read, the browser's normal decoding remains the fallback.
  }

  return 1;
}
