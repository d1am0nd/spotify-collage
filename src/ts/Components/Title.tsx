import {h, FunctionalComponent} from 'preact';

const style = {
  marginTop: 0,
  fontSize: '3em',
  lineHeight: '1em',
  letterSpacing: '2px',
  fontWeight: 200,
  paddingRight: 0,
  maxWidth: '600px',
};

const Title: FunctionalComponent = ({children}) => (
  <h1 style={style}>{children}</h1>
);

export default Title;
