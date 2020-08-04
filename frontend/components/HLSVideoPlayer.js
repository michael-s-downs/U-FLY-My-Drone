import React from "react";
import Hls from "hls.js";
import socket from '../socket';
export default class HLSVideoPlayer extends React.Component {
  state = {};
  componentDidUpdate() {
      const video = this.player;
      const hls = new Hls();
      //const src = useSocket();
      const src = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";
 
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() { video.play(); });
  }
  render() {
    return (
          <video
            className="videoCanvas"
            ref={player => (this.player = player)}
            autoPlay={true}
          />
    );
  }
}
function useSocket() {
    socket.on('video', rawVideo => {
         return rawVideo;
     });    
 }