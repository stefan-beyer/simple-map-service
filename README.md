# Simple View

Prerequesite:

- [nodejs version 6.11.x](https://nodejs.org/en/download/)

## Description
This is a App that visualizes the position of the car as the video plays.
The OBD Worker and the Vodeo Worker must be running.
It sets the persona (hardcoded) and then listens to the position of the car.

## Quickstart

Install:

1. Install the Frontend (leaflet will be installed):
```
cd public
npm install
```
2. Install the server:
```
cd ..
npm install
```

Change the IP / Domain of the router in /public/index.html

```
var mapsf = new MapServiceFrontend('localhost');
```

start app server
```
node mapapp.js
```

1. start the odb_worker and video_worker.
2. open the displayed URL in the browser.
3. The corresponding video should get loaded automaticly
4. Start the video... watch the map... ;)


## Internas

- calls conti.videoplayer.source to set the persona
- notifys (publish) conti.wamp2polymer.persona about the persona
- subscribes to conti.obdserver.coordinates for coordinates