import styled from 'styled-components';

const LoftStyles = styled.div`
  width: 100%;
  --color: ${props => (props.level > 0 ? '#228EE3' : '#BF9757')};
  /*border: 2px solid black;*/
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
  background: #c5c5c5;
  .loftHeight {
    transition: all 0.5s;
    height: ${props => props.level}%;
    text-align: center;
    color: white;
    display: block;
    background: var(--color);
  }
`;

const Loft = props => (
  <LoftStyles level={props.height}>
    <span className="loftHeight">{props.height} CM</span>
  </LoftStyles>
);

Loft.defaultProps = {
   level: 0,
};

export default Loft;
