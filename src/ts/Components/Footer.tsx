import {h, FunctionalComponent} from 'preact';

const style = {
  position: 'fixed',
  bottom: '10px',
};

const Footer: FunctionalComponent = () => (
  <div style={style}>
    Made by <a href="https://kordes.dev">Dev Kordes</a>
  </div>
);

export default Footer;
