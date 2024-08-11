export function grayscale(originalImage: ImageBitmap) {
  const canvas = new OffscreenCanvas(originalImage.width, originalImage.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  ctx.drawImage(originalImage, 0, 0, originalImage.width, originalImage.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // 红
    data[i + 1] = avg; // 绿
    data[i + 2] = avg; // 蓝
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.convertToBlob().then((blob) => {
    if (blob) {
      return new File([blob], Date.now().toString());
    }
  });
}
