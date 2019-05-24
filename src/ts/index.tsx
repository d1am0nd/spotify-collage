import {getTop} from './api';
import {
  removeTokenFromStorage,
  setLink,
  removeLink,
  getToken,
  IToken,
} from './init';

interface IImage {
  text?: string;
  src: string;
  x: number;
  y: number;
};

async function* asyncImageIterator(images: Array<IImage>): AsyncIterable<[number, HTMLImageElement]> {
  for (let [i, image] of images.entries()) {
    yield await new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onerror = () => rej(new Error('Couldn\'t load image'));
      img.onload = () => {
        setTimeout(() => res([i, img]), 100);
      };
      img.src = image.src;
    });
  }
}

// Collage dimensions
const IMAGE_WIDTH = 160;
const IMAGE_HEIGHT = IMAGE_WIDTH;
const IMAGE_COUNT = 9;
const ROW_COUNT = 3;
const COLUMN_COUNT = ROW_COUNT;

const main = async (token: IToken) => {
  // Get top artists from Spotify
  const response = await getTop(token, IMAGE_COUNT);

  const images = response
    .data
    .items
    .map(({images}) => (
      images
        // They're odered largest to lowest by default
        .reverse()
        // Return the first images that is either 160x160 or larger
        .find(({height, width}) => (
          height >= IMAGE_HEIGHT
          && width >= IMAGE_WIDTH
        ))
    ))
    // Return src and position on the canvas
    .map(({url}, i) => ({
      src: url,
      x: (i % ROW_COUNT) * IMAGE_WIDTH,
      y: Math.floor(i / COLUMN_COUNT) * IMAGE_WIDTH,
      text: 'test',
    }));

  const canvas = window.document.createElement('canvas');
  canvas.width = IMAGE_WIDTH * COLUMN_COUNT;
  canvas.height = IMAGE_HEIGHT * ROW_COUNT;

  const ctx = canvas.getContext('2d');

  for await (const [i, image] of asyncImageIterator(images)) {
    // Draw image to canvas with x, y cooridanters
    ctx.drawImage(
      image as HTMLImageElement,
      images[i].x,
      images[i].y,
      IMAGE_WIDTH,
      IMAGE_HEIGHT
    );

    document
      .getElementById('collage-image')
      .setAttribute('src', await canvas.toDataURL());
  }
};

const token = getToken();
if (token) {
  removeLink();
  main(token)
    .then()
    .catch(() => {
      removeTokenFromStorage();
    });
} else {
  setLink();
}
