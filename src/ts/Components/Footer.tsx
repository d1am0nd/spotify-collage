import {h, FunctionalComponent} from 'preact';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 25px;
`;

const Footer: FunctionalComponent = () => (
  <Wrapper>
    Made by <a rel='noopener' target='_blank' href='https://kordes.dev'>Dev Kordes</a>
  </Wrapper>
);

export default Footer;
