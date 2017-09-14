'use strict'

class MapServiceFrontend {
    constructor(arg_ip) {

        // initialize the leaflet map
        this.map = L.map('mapid').setView([50.5415714416154, 9.727014627461099], 13);

        // set openstreetmap tiles
        L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'openstreetmap.de'
        }).addTo(this.map);

        // set a marker to some random position
        this.marker = L.marker([50.5415714416154, 9.727014627461099]).addTo(this.map);

        // persona name is hardcoded here
        this.persona = 'persona_4';

        // this is used for simulation
        this.index = 0;
        this.direction = 1;


        // connection to the router
        var loc_url = "ws://" + arg_ip + ":8080/ws";
        this.wampConnection = new autobahn.Connection({
            url: loc_url,
            realm: "realm1",
            authextra: {service_name: 'map-worker'}
        });

        this.wampConnection.onopen = function (session) {
            console.log("WAMP Connection session is open");

            this.session = session;


            // set the persona of the videoplayer
            this.session.call('conti.videoplayer.source', [this.persona]);

            // set the persona in the obd server
            var loc_wamp = {};
            loc_wamp.payload = this.persona;
            loc_wamp.topic = "persona";
            this.session.publish("conti.wamp2polymer.persona", [loc_wamp]);

            // listen to the coordinates from obdserver
            this.session.subscribe("conti.obdserver.coordinates", function(arg) {
                this.setCoordinates(arg);
            }.bind(this));

            // this will adjust the menter of the map every now and then
            setInterval(function() {
                this.map.panTo(this.marker.getLatLng());
            }.bind(this), 3270);


            // This is for simulation without listening to conti.obdserver.coordinates
            /*setInterval(function() {
                this.nextPoint();
            }.bind(this), 1000);*/


        }.bind(this);

        this.wampConnection.open();
    }

    // update the coordinates of the marker
    setCoordinates(coordinates) {
        //console.log(coordinates);
        // lat and lon have to be reversed
        var coords = [coordinates[1], coordinates[0]];
        this.marker.setLatLng(coords);
        //this.map.panTo(coords);
    }


    // for simulation
    nextPoint() {
        var idx = this.index;


        this.index += this.direction;
        if (this.index < 0) {
            this.index = 0;
            this.direction *= -1; // change direction
        }

        var that = this;

        // get a point
        this.session.call('conti.obdserver.getpoint', [idx]).then(
                function(erg) {
                    //console.log(idx, erg);
                    if (erg.coordinates) {
                        that.setCoordinates(erg.coordinates);
                    } else {
                        that.index -= that.direction;
                        that.index -= that.direction;
                        that.direction *= -1;   // change direction
                    }
                },
                function(err) {
                    console.log(err);
                }
                );
    }



}


