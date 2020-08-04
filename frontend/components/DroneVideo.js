//import { useState, useEffect } from 'react';
import styled from 'styled-components';
import socket from '../socket';
import dynamic from "next/dynamic";
import videoPlayer from 'VideoPlayer';
//import VideoPlayer from './Player';

//gotta have 'jmuxer' in order to read the non-standard video stream! 
//But this library requires DYNAMIC load as it requires window object ONLY in browser.
const JMuxer = dynamic(
  () => {
    return import('jmuxer');
  },
  { ssr: false }
);

//to-do this is repeated in Commands.js too, abstract from here an d there...
function sendCommand(command) {
    return function() {
      console.log(`Sending the command ${command}`);
      socket.emit('command', command);
    };
  }
/*
  function processH264VideoFeed(rawVideo) {
    const jmuxer = new JMuxer({
        node: 'player',
        mode: 'video',
        flushingTime: 10,
        fps: 30,
        debug: false
    }).feed({
        video: new Uint8Array(rawVideo),
        duration: 100
    });      
  */  
    /*
    const feed = new jmuxer.feed({
        video: new Uint8Array(rawVideo),
        duration: 100
    }); 
}
*/
/*
function componentDidMount() {
    useSocket();
}

function useSocket() {
   socket.on('video', rawVideo => {
        processH264VideoFeed(rawVideo);
    });    
}
*/
/*
function useSocket() {
    //const [video, updateVideo] = useState('Streaming Video Unvailable (Check Drone State)');  

    async function processH264VideoFeed(rawVideo) {
        const jmuxer = new JMuxer({
            node: 'player',
            mode: 'video',
            flushingTime: 10,
            fps: 30,
            debug: false
        });
        const processedVideo = jmuxer.feed({
            video: new Uint8Array(rawVideo),
            duration: 100
        });
        updateVideo(video);
    }
    useEffect(() => {
        socket.on('video', rawVideo => {
            processH264VideoFeed(rawVideo);
        });
        return () => socket.removeListener('video');
    }, []);
    return video;
  } 
*/
  const DroneVideoWrap = styled.div`
  text-align: center;
  display: grid;
  overflow: hidden;
  grid-gap: 5px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 6fr;
  span {
    background: #131FAA;
  }
`;

const DroneVideoStyles = styled.div`
  .vidButton {
    background: #228EE3;
    color: white;
  }
  .vidPlayer {
    width:480px;
  }
  .vidspan {
    border: 2px solid black;
    border-radius: 5px;
    overflow: hidden;
    background: #c5c5c5;
  }
`;

const DroneVideo = () => {
    //const videoStream = componentDidMount();
  return (
        <videoPlayer />
  );
};

export default DroneVideo;
