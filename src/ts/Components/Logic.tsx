import {h, FunctionalComponent} from 'preact';
import {useState} from 'preact/hooks';
import styled from 'styled-components';
import {getToken, authLink} from '../init';
import {getTop, TimeRange, IArtist} from '../api';
import Collage from './Collage';

const Wrapper = styled.div`
  margin-top: 50px;
`;

const Button = styled.button`
  font-size: 18px;
  text-decoration: none;
  line-height: 1;
  border-radius: 500px;
  padding: 18px 48px 16px;
  transition-property: background-color,border-color,color,box-shadow,filter;
  transition-duration: .3s;
  border-width: 0;
  letter-spacing: 2px;
  width: 320px;
  text-transform: uppercase;
  white-space: normal;
  display: block;
  margin-bottom: 50px;
  font-weight: 700;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  outline: none;
`;

const GenerateButton = styled(Button)`
  background-color: lightskyblue;
`;

const SpotifyButton = styled(Button)`
  border-color: #1aa34a;
  color: #fff;
  background-color: #1db954;
`;

interface IProps {
  range: TimeRange;
  size: number;
};

const Logic: FunctionalComponent<IProps> = ({
  size,
  range,
}) => {
  const token = getToken();
  const [artists, setArtists] = useState([]);
  const [lastGenerated, setLastGenerated] = useState<[TimeRange | undefined, number | undefined]>([undefined, undefined]);

  if (typeof token === 'undefined') {
    return (
      <Wrapper>
        <SpotifyButton onClick={() => {
          window.location.replace(authLink());
        }}>
          Spotify login
        </SpotifyButton>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <GenerateButton
        onClick={async (e: MouseEvent) => {
          e.preventDefault();

          if (lastGenerated[0] === range && lastGenerated[1] === size) {
            return;
          }

          setLastGenerated([range, size]);
          setArtists((await getTop(token, size, range)).data.items);
        }}>
        Generate collage
      </GenerateButton>
      {
        artists.length !== 0
          ? <Collage
              size={size}
              artists={artists} />
          : null
      }
    </Wrapper>
  );
};

export default Logic;
