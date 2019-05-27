import {h, FunctionalComponent} from 'preact';
import {btnStyle} from '../styles';

const style = {
  ...btnStyle,
  width: '320px',
  backgroundColor: 'lightskyblue',
};

interface IProps {
  handleClick: (e: MouseEvent) => void;
};

const GenerateButton: FunctionalComponent<IProps> = ({
  children,
  handleClick,
}) => (
  <div>
    <button onClick={handleClick} style={style}>{children}</button>
  </div>
);

export default GenerateButton;
