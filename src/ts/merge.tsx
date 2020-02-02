interface IImage {
  text?: string;
  src: string;
  x: number;
  y: number;
};

interface IOptions {
  onLoad: (img: HTMLImageElement, i: number) => void;
};

export async function* asyncImageIterator(
  images: Array<IImage>,
  timePerImage: number
): AsyncIterable<[number, HTMLImageElement]> {
  for (let [i, image] of images.entries()) {
    yield await new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onerror = () => rej(new Error('Couldn\'t load image'));
      img.onload = () => {
        setTimeout(() => res([i, img]), timePerImage);
      };
      img.src = image.src;
    });
  }
};

export const createCanvas = (w: number, h: number) => {
  const canvas = window.document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  return canvas;
};
