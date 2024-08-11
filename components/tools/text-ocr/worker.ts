import { grayscale } from "@/utils/image";

// 获取到主线程中的图片资源灰度化处理
self.addEventListener("message", function (e: MessageEvent<File>) {
  const originalFile = e.data;

  createImageBitmap(originalFile)
    .then(grayscale)
    .then((file) => {
      self.postMessage(file);
    });
});
