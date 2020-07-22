import {h, FunctionalComponent} from 'preact';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 25px;
  display: flex;
`;

const MarginAuto = styled.div`
  margin-left: auto;
`

const Footer: FunctionalComponent = () => (
  <Wrapper>
    <div>
      Made by <a rel='noopener' target='_blank' href='https://kordes.dev'>Dev Kordes</a><br/>
    </div>
    <MarginAuto>
      <a href="https://collage.kordes.dev/privacy-policy.txt">Privacy policy</a>
    </MarginAuto>
  </Wrapper>
);

export default Footer;
