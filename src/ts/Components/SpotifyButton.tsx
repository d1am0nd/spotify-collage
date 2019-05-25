import {h, FunctionalComponent} from 'preact';
import {btnStyle} from '../styles';

const style = {
  ...btnStyle,
  borderColor: '#1aa34a',
  color: '#fff',
  backgroundColor: '#1db954',
};

interface IProps {
  to: string;
};

const SpotifyButton: FunctionalComponent<IProps> = ({
  children,
  to,
}) => (
  <div>
    <a href={to} style={style}>{children}</a>
  </div>
);

export default SpotifyButton;
