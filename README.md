# Simple Map For Position Visualisation

**As part of the Continental Hackathon 2017**

Prerequesite:

- [nodejs version 6.11.x](https://nodejs.org/en/download/)

## Description
This is an app that visualizes the position of the car as the video plays.
The OBD Worker and the Video Worker must be running.
It sets the persona (hardcoded) and then listens to the position of the car.

## Quickstart


1. Install the frontend:
```
cd public
npm install
```
2. Install the server:
```
cd ..
npm install
```

3. Change the IP / Domain of the router in `/public/index.html`
```
var mapsf = new MapServiceFrontend('localhost');
```

4. Change the persona in `/public/map.js`
```
// persona name is hardcoded here
this.persona = 'persona_4';
```

5. start the odb_worker and video_worker.

6. Open video app in browser

7. start map app server:
```
node mapapp.js
```

8. Start the video... watch the map... ;)


## Internas

- calls conti.videoplayer.source to set the persona
- notifys (publish) conti.wamp2polymer.persona about the persona
- subscribes to conti.obdserver.coordinates for coordinates