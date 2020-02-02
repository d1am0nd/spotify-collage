import {h, FunctionalComponent} from 'preact';
import {useState} from 'preact/hooks';
import styled from 'styled-components';
import {TimeRange} from '../api';
import Title from './Title';
import Footer from './Footer';
import Logic from './Logic';
import Emphasis from './Emphasis';

const Wrapper = styled.div`
  margin: auto;
  max-width: 600px;
`;

const Shoutouts = styled.p`
  font-size: 1.1em;
`;

const Ul = styled.ul`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: lightskyblue;
`;

const Li = styled.li`
  text-transform: uppercase;
  display: table-cell;
  textAlign: center;
  padding: 16px;
  textDecoration: none;
  margin: auto;
  width: 100%;
  cursor: pointer;
  text-align: center;
  border: solid 1px white;
  font-size: 16px;
  letter-spacing: 2px;
  height: 100%;
  background-color: ${
    ({selected}: {selected: boolean}) => selected
      ? '#1db954'
      : 'inherit'
  };
  color: ${
    ({selected}: {selected: boolean}) => selected
      ? 'white'
      : 'black'
  };
`;

const LS_SIZE = 'SIZE';
const LS_RANGE = 'RANGE';

type Size = '3x3' | '4x4' | '5x5' | '6x6'| '7x7';

const sizeMap = new Map<Size, number>([
  ['3x3', 9],
  ['4x4', 16],
  ['5x5', 25],
  ['6x6', 36],
  ['7x7', 49],
]);

const timeMap = new Map<string, TimeRange>([
  ['4 weeks', 'short_term'],
  ['6 months', 'medium_term'],
  ['Max', 'long_term'],
]);

const Layout: FunctionalComponent = () => {
  const [time, setTime] = useState<TimeRange>(
    (localStorage.getItem(LS_RANGE) as TimeRange) || 'short_term'
  );
  const [size, setSize] = useState<number>(
    parseInt(localStorage.getItem(LS_SIZE)) || 9
  );

  return (
    <Wrapper>
      <Title>Spotify collage generator</Title>
      <Emphasis>
        Generate a collage of your favourite Spotify artists
      </Emphasis>
      <Shoutouts>
        Shoutouts to {` `}
        <a target='_blank' href='http://www.tapmusic.net/'>tapmusic.net</a>
      </Shoutouts>
      <Ul>
        {[...sizeMap.keys()].map((currSize) => (
          <Li
            selected={size === sizeMap.get(currSize)}
            onClick={() => {
              const val = sizeMap.get(currSize);
              setSize(val);
              localStorage.setItem(LS_SIZE, String(val));
            }}
            key={currSize}>
            {currSize}
          </Li>
        ))}
      </Ul>
      <Ul>
        {[...timeMap.keys()].map((currTime) => (
          <Li
            selected={time === timeMap.get(currTime)}
            onClick={() => {
              const val = timeMap.get(currTime);
              setTime(val);
              localStorage.setItem(LS_RANGE, val);
            }}
            key={currTime}>
            {currTime}
          </Li>
        ))}
      </Ul>
      <Logic range={time} size={size} />
      <Footer />
    </Wrapper>
  );
}

export default Layout;
