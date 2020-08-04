import styled from 'styled-components';
import Loft from './Loft';

const TiltWrap = styled.div`
  perspective: 500px;
  transform-style: preserve-3d;
  text-align: center;
  display: grid;
  justify-content: center;
  overflow: hidden;
  grid-gap: 5px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 5fr;
  span {
    background: #131FAA;
  }
`;
const TiltStyles = styled.div`
  background-image: url('/static/TelloCropped.jpg');
  background-size: contain;
  background-position: center;
  height: 100px;
  /* transition: all 0.2s; */
  color: white;
  transform: rotateX(${props => props.pitch}deg)
    rotate(${props => props.yaw * -1}deg)
    rotateY(${props => props.roll * -1}deg);
  position: relative;
  grid-column: 1 / -1;
`;

const TiltPitch = styled.div`
  background-image: url('/static/plane-PITCH-2.png');
  background-size: contain;
  background-position: center;
  height: 100px;
  /* transition: all 0.2s; */
  color: white;
  transform: rotate(${props => props.pitch}deg);
  position: relative;
  grid-column: 1;
`;

const TiltRoll = styled.div`
  background-image: url('/static/plane-ROLL-2.png');
  background-size: contain;
  background-position: center;
  height: 100px;
  /* transition: all 0.2s; */
  color: white;
  transform: rotate(${props => props.roll}deg);
  position: relative;
  grid-column: 1;
`;

const TiltYaw = styled.div`
  background-image: url('/static/plane-YAW-2.png');
  background-size: contain;
  background-position: center;
  height: 100px;
  /* transition: all 0.2s; */
  color: white;
  transform: rotate(${props => props.yaw}deg);
  position: relative;
  grid-column: 1;
`;

const TiltYawSpan = styled.span`
  transform: rotate(${props => props.yaw}deg)
`;

const TiltRollSpan = styled.span`
  transform: rotate(${props => props.roll}deg)
`;

const TiltPitchSpan = styled.span`
  transform: rotate(${props => props.pitch}deg)
`;

const TiltHeight = styled.div`
  background-image: url('/static/plane-HEIGHT.png');
  background-size: contain;
  background-position: center;
  height: ${props => props.height + 1}px;
  /* transition: all 0.2s; */
  color: white;
  position: relative;
  grid-column: 1;
`;

const SpanHeight = styled.span`
  vertical-align:bottom;
  background: #CCCCCC;
`;

const Tilt = ({ pitch, roll, yaw, height }) => (
  <TiltWrap>
    <span>Pitch: {pitch}</span>
    <span>Roll: {roll}</span>
    <span>Yaw: {yaw}</span>
    <span>Loft: {height}</span>
    <span><TiltPitch pitch={pitch} /></span>
    <span><TiltRoll roll={roll} /></span>
    <span><TiltYaw yaw={yaw} /></span>
    <Loft height={height} />
  </TiltWrap>
);

Tilt.defaultProps = {
  pitch: 0,
  roll: 0,
  yaw: 0,
  height: 0,
};

export default Tilt;
