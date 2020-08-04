import React from "react";
import dynamic from "next/dynamic";
import socket from '../socket';
export default class JmuxerPlayer extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    //import funky react-unfriendly library dynamically because it assumes existence of a DOM already (with window object)... 
    const JMuxer = dynamic(
        () => {
          return import('jmuxer');
        },
        { ssr: false }
      );
      let jmuxer = new JMuxer({
        node: 'player',
        mode: 'video',
        flushingTime: 10,
        fps: 30,
        debug: true
    });
    this.jmuxer = jmuxer;
  }

  componentDidMount() {
    var count = 0;
    this.useSocket(count);
  }

  render() {
    return (
        <div id="container" style={{width: '500px'}}>
          <video width="500" controls autoPlay poster="static/loader-thumb.jpg" id="player"></video>
        </div>  
    );
  }
  useSocket(count) {
    socket.on('video', rawVideo => {
        count++;    
        console.log(`caught rawVideo chunk ${count}`); //for browser console
        return function nowItsAFunction(){
            this.jmuxer.feed = {
                input: new Uint8Array(rawVideo),
                duration : 100
            }
        };
    });
}
   
}
