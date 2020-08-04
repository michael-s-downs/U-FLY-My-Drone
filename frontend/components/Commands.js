import styled from 'styled-components';
import socket from '../socket';

const CommandGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.25fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  border: 1px solid black;
  grid-gap: 3px;
  button {
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.05);
    border: 0;
    background: #6633C6;
    border: 4px solid transparent;
    color: white;
    font-size: 1rem;
    position: relative;
    &:active {
      top: 2px;
    }
    &:focus {
      outline: 0;
      border-color: #ffc600;
    }
    &.coolmoves {
      background: #9A5BD4;
      color: white;
    }    
    &.takeoff {
      background: #8BC633;
    }
    &.land {
      background: #5AA136;
    }
    &.emergency {
      background: #CE2929;  //blood animal
      text-transform: uppercase;
      color: white;
    }
    &.rotate {
      background: #228EE3;
      color: white;
    }
    &.move {
      background: #6633C6;
      color: white;
    }    
    &.height {
      background: #228EE3;
      color: white;
    }
    span.symbol {
      display: block;
      font-size: 2rem;
      font-weight: 400;
    }
  }
  .center {
    display: grid;
    grid-gap: 3px;
    grid-template-columns: 1fr 1fr;
    button:last-child {
      grid-column: span 2;
    }
  }
  .coolHeader {
    grid-column: 1 / -1;
    background: #000000;  //black
    margin: 0;
    font-size: 1rem;
    text-align: center;
    padding: 0.5rem;
    color: white;
  }
  .videoHeader {
    grid-column: 1 / -1;
    background: #000000;  //black
    margin: 0;
    font-size: 1rem;
    text-align: center;
    padding: 0.5rem;
    color: white;
  }
  .vidButton {
    background: #fffdaf;
    color: black;
    font-weight: bold;
  }
  .vidPanel {
    display: grid;
    grid-gap: 3px;
    grid-template-columns: 1fr 1fr;
  }
  .vidStretcher {
    grid-column: 1 / -1;
  }
`;

function sendCommand(command) {
  return function() {
    console.log(`Sending the command ${command}`);
    socket.emit('command', command);
  };
}

const amount = 50;
const Commands = () => (
  <CommandGrid>
    <button className="rotate" onClick={sendCommand('ccw 90')}>
      <span className="symbol">⟲</span> 90°
    </button>
    <button className="move" onClick={sendCommand(`forward ${amount}`)}>
      <span className="symbol">↑</span> forward {amount}cm
    </button>
    <button className="rotate" onClick={sendCommand('cw 15')}>
      <span className="symbol">⟳</span> 15°
    </button>
    <button onClick={sendCommand(`left ${amount}`)}>
      <span className="symbol">←</span> left {amount}cm
    </button>
    <div className="center">
      <button className="takeoff" onClick={sendCommand('takeoff')}>
        Take Off
      </button>
      <button className="land" onClick={sendCommand('land')}>
        Land
      </button>
      <button className="emergency" onClick={sendCommand('emergency')}>
        !! emergency !!
      </button>
    </div>
    <button onClick={sendCommand(`right ${amount}`)}>
      <span className="symbol">→</span>
      right {amount}cm
    </button>
    <button className="height" onClick={sendCommand(`up ${amount}`)}>
      <span className="symbol">⤒</span> {amount}cm
    </button>
    <button onClick={sendCommand(`back ${amount}`)}>
      <span className="symbol">↓</span> back {amount}cm
    </button>
    <button className="height" onClick={sendCommand(`down ${amount}`)}>
      <span className="symbol">⤓</span> {amount}cm
    </button>
    <h2 className="coolHeader">Cool Moves</h2>
    <button className="coolmoves" onClick={sendCommand('flip l')}>Flip Left</button>
    <button className="coolmoves" onClick={sendCommand('flip r')}>Flip Right</button>
    <button className="coolmoves" onClick={sendCommand('flip b')}>Flip Back</button>
    <button className="coolmoves" onClick={sendCommand('flip f')}>Flip Forward</button>
    <button className="coolmoves" onClick={sendCommand('go 25 25 25 25')}>Go 25 25 25 25</button>
    <button className="coolmoves" onClick={sendCommand('curve 100 100 100 150 250 350 50')}>Curve!</button>
    <h2 className="videoHeader">Video State</h2>
    <div className="vidStretcher">
      <div className="vidPanel">
        <button className="vidButton" onClick={sendCommand('streamon')}>START Streaming</button>
        <button className="vidButton" onClick={sendCommand('streamoff')}>STOP Streaming</button>
      </div>
    </div>  
  </CommandGrid>
);

export default Commands;
