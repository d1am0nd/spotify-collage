import {h, FunctionalComponent} from 'preact';
import {useState, useEffect} from 'preact/hooks';
import {IArtist, IImage} from '../api';
import {createCanvas, asyncImageIterator} from '../merge';

// Collage dimensions
const IMAGE_WIDTH = 160;
const IMAGE_HEIGHT = IMAGE_WIDTH;
const IMAGE_COUNT = 9;
const ROW_COUNT = 3;
const COLUMN_COUNT = ROW_COUNT;

const style = {
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
};

interface IProps {
  artists: Array<IArtist>;
};

const extractImages = (
  {images}: IArtist
) => images
  .reverse()
  .find(({height, width}) => (
    height >= IMAGE_HEIGHT
    && width >= IMAGE_WIDTH
  ));

const mapImage = (
  {url}: IImage,
  i: number
) => ({
  src: url,
  x: (i % ROW_COUNT) * IMAGE_WIDTH,
  y: Math.floor(i / COLUMN_COUNT) * IMAGE_WIDTH,
});

const Collage: FunctionalComponent<IProps> = ({
  artists
}) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const canvas = createCanvas(
    IMAGE_WIDTH * COLUMN_COUNT,
    IMAGE_HEIGHT * ROW_COUNT
  );
  const ctx = canvas.getContext('2d');
  const images = artists
    .map(extractImages)
    .map(mapImage);

  useEffect(() => {
    (async () => {
      for await (const [i, image] of asyncImageIterator(images)) {
        // Draw image to canvas with x, y cooridanters
        ctx.drawImage(
          image as HTMLImageElement,
          images[i].x,
          images[i].y,
          IMAGE_WIDTH,
          IMAGE_HEIGHT
        );

        setImgSrc(await canvas.toDataURL());
      }
    })();
  }, []);

  return (
    <img src={imgSrc} style={style} />
  );
};

export default Collage;
