# U-FLY-My-Drone
A Node + React Learning Experiment...

⚠️️️ Always:  Use the codebase at your own risk. The drone can hurt you especially if you let someone else remote control it from the internet! Use common sense. ⚠️

⚠️️️ Today:  Until this statement is removed, don't stick a Fork in it, its half-baked.  This is a working repository and only when this statement is removed and replaced with a version higher than 1.0.0. is it reasonable to expect it to work enough to fork. ⚠️️️ 

CREDITS:
This project is built upon or takes inspiration from at least three other public repos on GitHub:  
* https://github.com/wesbos/javascript-drones
* https://github.com/samirkumardas/jmuxer
* https://github.com/markwinap/DJI-Tello-WS-Server

![](https://raw.githubusercontent.com/michael-s-downs/U-FLY-My-Drone/master/frontend/static/Screenshot-Sized.png)

The main setup of node server and react front-end is a fork of javascript-drones to which I've added drone video capture and controls (essential for remote-control flight to see where you're going), new and updated controls and some aesthetic mods.  For capture and display of drone h264 video-stream direct from socket, I am using jmuxer, but this requires dynamic dependency loading in React (or Next) as the library expects a pre-existing DOM which is anti-pattern for Next.js.  To allow Internet control via a secure tunnel to the local server (& local wi-fi connection to drone), I am taking inspiration from DJI-Tello-WS-Server project to use ngrok.  Mark's project also incorporates a very cool game-controller interfacing option which is not used on my desktop app, if you have such a harware device and want to make that option available check that out! 

# Flying a Drone with React and Node.js

## Software Used
* React (with React Hooks, an old-school Class, and dynamic dependency loading for DOM-requiring libraries (jmuxer))
* Styled Components for styling
* Node.js and UDP4 sockets for communicating with drone
* Socket.io WebSockets for sending data to/from the browser
* Next.js for easy react setup
## Hardware Used
* [DJI Tello Drone](https://amzn.to/2SvzqON)
* [Extra Batteries](https://amzn.to/2SyV70J) - it comes with one and I bought two extra. For continual development I'd say you only need two — one in the charger and one in the drone. For flying away from your house you definitely need at least 3 as they only last about 10-15 mins.
* [Fast Battery Charger with 4 slots](https://amzn.to/2SAWqwb)
## Using This Code
### Frontend
1. cd `frontend`
1. `npm install`
1. `npm run dev`
### Backend
1. cd `backend`
1. `npm install`
1. connect to drone via wifi
1. `npm start`
## ONLY for accessing drone over internet (tunnel)
### Install ngrok
https://ngrok.com/
### Unzip
unzip ngrok.zip
### Setup your account
./ngrok authtoken 6X8R
### Open tunnel
./ngrok http 3000 (assuming Next.js default production port)
## Troubleshooting
[Docs for Tello are available here](https://dl-cdn.ryzerobotics.com/downloads/tello/20180910/Tello%20SDK%20Documentation%20EN_1.3.pdf)
I had to update the firmware of my drone when it came in the mail before I could use this 1.3 API. Do this via the Tello app on your phone.
If you let the drone's WIFI connection lapse, you have to restart the server by typing `rs` into the terminal. This will re-run the `command command` that puts the drone in SDK mode. If you don't do this, it will ignore any commands you send it.
## License — WTFPL
I want you to build cool stuff with this.
Please hack on it and make your own cool things.
## Further Examples & Resources
* [jsolderitsch/tello-nodejs](https://github.com/jsolderitsch/tello-nodejs) - very simple JavaScript examples
* [FFMpeg + Node.js Video in the browser complicated example](https://github.com/SovGVD/nodetello/)
* [Some Japanese Developer Figured out how to get video working with WebRTC](https://qiita.com/a-baba/items/d728d580f89473c5fd18)
* [Drone Keyboard for Tello](https://github.com/dnomak/drone-keyboard#drone-keyboard-for-tello)
* Link your repo here for others to learn!
