import {h, FunctionalComponent} from 'preact';

const style = {
  fontWeight: 200,
  marginTop: '1.5em',
  fontSize: '1.7em',
};

const Emphasis: FunctionalComponent = ({children}) => (
  <p style={style}>{children}</p>
);

export default Emphasis;
