import {h, FunctionalComponent} from 'preact';
import {useState, useEffect} from 'preact/hooks';
import styled from 'styled-components';
import {IArtist, IImage} from '../api';
import {createCanvas, asyncImageIterator} from '../merge';

const Img = styled.img`
  margin: auto;
  display: block;
  max-width: 100%;
`;

const GENERATION_LENGTH = 900;

const extractImages = (imgHeight: number, imgWidth: number) => (
  {images}: IArtist
) => images
  .reverse()
  .find(({height, width}) => (
    height >= imgHeight
    && width >= imgWidth
  ));

const mapImage = (
  colCount: number,
  rowCount: number,
  imgWidth: number,
  imgHeight: number
) => (
  {url}: IImage,
  i: number
) => ({
  src: url,
  x: (i % rowCount) * imgWidth,
  y: Math.floor(i / colCount) * imgHeight,
});

interface IProps {
  size: number;
  artists: Array<IArtist>;
};

const Collage: FunctionalComponent<IProps> = ({
  artists,
  size,
}) => {
  // Full image size (both width and height)
  const fullImgSize = 480;
  // Image count (both rows and columns)
  const imgCount = Number(Math.sqrt(size));

  const singleImgSize = Number(fullImgSize / imgCount);

  const timePerImage = GENERATION_LENGTH / artists.length;

  const [imgSrc, setImgSrc] = useState<string>('');
  const canvas = createCanvas(
    fullImgSize,
    fullImgSize
  );
  const ctx = canvas.getContext('2d');
  const images = artists
    .map(extractImages(singleImgSize, singleImgSize))
    .map(mapImage(imgCount, imgCount, singleImgSize, singleImgSize));

  useEffect(() => {
    (async () => {
      for await (const [i, image] of asyncImageIterator(images, timePerImage)) {
        // Draw image to canvas with x, y cooridanters
        ctx.drawImage(
          image as HTMLImageElement,
          images[i].x,
          images[i].y,
          singleImgSize,
          singleImgSize
        );

        setImgSrc(await canvas.toDataURL());
      }
    })();
  }, [artists]);

  return (
    <Img src={imgSrc} />
  );
};

export default Collage;
