const dgram = require('dgram');
const wait = require('waait');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const throttle = require('lodash/throttle');
const commandDelays = require('./commandDelays');

//lets make some constants...
const DRONE_PORT = 8889;
const STATE_PORT = 8890;
const VIDEO_PORT = 11111;
const HOST = '192.168.10.1';

//and some variables...
let videoBuff = []; //VIDEO BUFFER
let counter = 0; //COUNTER FOR VIDEO BUFFER FRAMES
let dumbCount = 0; //COUNTER FOR CHECKING LIVENESS OF VIDEO (REMOVE LATER)

/*
CREATE SOCKETS:  3 FOR DRONE plus 1 for the REACT-FRONTEND 
*/

//UDP Socket to SEND DRONE COMMANDS (and get back brief status)...
const drone = dgram.createSocket('udp4');
drone.bind(DRONE_PORT);

//UDP Socket to RECEIVE DRONE STATE (constant stream of battery, temp, pitch/roll/yaw, height etc) 
const droneState = dgram.createSocket('udp4');
droneState.bind(STATE_PORT);

//UDP Socket to RECEIVE DRONE VIDEO 
const droneVideo = dgram.createSocket('udp4');
droneVideo.bind(VIDEO_PORT);

//IO Socket to talk to React Front-End  (better than a web-socket because we can label the messages for React)
io.on('connection', socket => {
  socket.on('command', command => {
    console.log('command Received from React FrontEnd (Browser)');
    console.log(command);
    drone.send(command, 0, command.length, DRONE_PORT, HOST, handleError);
  });
  //'ACK' the React Front-End that 2-way socket.io is established between it and this Node Server Back-End
  socket.emit('status', 'CONNECTED');
});

http.listen(6767, () => {
  //Debug 'ACK' here at node Server Back-End that React Front-End has connected.
  console.log('Socket io server up and running');
});

/*
HANDLE VARIOUS SOCKET MESSAGING 
*/

drone.on('message', message => {
  console.log(`DRONE message: ${message}`);   //log messages to/from the drone in server's command window 
  io.sockets.emit('status', message.toString());  //pass along to React Front end as 'status' (this is not state)
});

//on state message, just pass it straight to React Frontend for display purposes.
droneState.on(
  'message',
  throttle(state => {   //...but throttle it to 10 messages a second any more is a waste of bandwidth 
    const formattedState = parseState(state.toString());
    io.sockets.emit('dronestate', formattedState);
  }, 100)
);

droneVideo.on('message', message => {
  dumbCount++;
  let buf = Buffer.from(message);
  if (buf.indexOf(Buffer.from([0, 0, 0, 1])) != -1) {
    //FIND IF FIRST PART OF FRAME
    counter++;
    if (counter == 3) {
      //COLLECT 3 FRAMES AND SEND TO WEBSOCKET
      io.sockets.emit('video', JSON.stringify({ droneVideo: Buffer.concat(videoBuff) }));
      console.log(`Node sends DRONEVIDEO chunk: ${dumbCount}`); //to feel the send rate...
      counter = 0;
      videoBuff.length = 0;
      videoBuff = [];
    }
    videoBuff.push(buf);
  } else {
    videoBuff.push(buf);
  }
});

droneVideo.on('error', (err) => {
  console.log(`drone video error:\n${err.stack}`);
  video.close();
});

// periodically sending command-command and any other startup commands to keep everything alive and connected... 
async function commandKeepAlive(commandArray) {
  //var commandArray = ['command', 'battery?', 'streamon'];
  var delay = 0;
  var loopDelay = 10000;
  for(i=0;i<commandArray.length;i++){
    var command = commandArray[i];
    delay = commandDelays[command];
    console.log(`running commandKeepAlive command: ${command}`);
    drone.send(command, 0, command.length, DRONE_PORT, HOST, handleError);
    await wait(delay);
    }
  await wait(loopDelay);    
  return commandKeepAlive(['command']);
	}
 commandKeepAlive(['command', 'battery?', 'streamon']);

function parseState(state) {
  return state
    .split(';')
    .map(x => x.split(':'))
    .reduce((data, [key, value]) => {
      data[key] = value;
      return data;
    }, {}); 
}

function handleError(err) {
  if (err) {
    console.log('ERROR');
    console.log(err);
  }
}
