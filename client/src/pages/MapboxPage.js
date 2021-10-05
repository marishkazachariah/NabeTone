import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
// import Geocoder from 'react-mapbox-gl-geocoder';
mapboxgl.accessToken = "pk.eyJ1IjoidHJhbnNpcmVudCIsImEiOiJja255bXRtZGowbHF0MnBvM3U4d2J1ZG5vIn0.IVcxB9Xw6Tcc8yHGdK_0zA";
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const geocoder = mbxGeocoding({accessToken: mapboxgl.accessToken});

export default function MapboxPage() {
    
    // mapbox 
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(11);

    // input field of address
    const [location, setLocation] = useState("");
    const [coordinates, setCoordinates] = useState([13.3983, 52.5124]);
    let locationLng;
    let locationLat;

    // audio file locations
    const [audioFileLocations, setAudioFileLocation] = useState(null);

    const API_URL = 'http://localhost:5005';

    // TODO: fill in coordinates from user to populate the map
    const getAllAudioFiles = () => {
		// get request to the server
		axios.get(`${API_URL}/api/audiofiles`)
			.then(response => {
				// console.log(response.data)
				setAudioFileLocation(response.data);
			})
			.catch(err => console.log(err));
	}
    // from the coordinates - match the database

    useEffect(() => {
        // initialize map only once
        if (map.current) return; 
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center:[coordinates[0], coordinates[1]],
            zoom: zoom
        });
        getAllAudioFiles();
    }, []);

    // convert / forward geocode the input address to coordinates 
    const convertAudioFileLocations = () => {
        audioFileLocations.map((audioLocation) => {
            return (
                geocoder.forwardGeocode({
                    query: audioLocation.location
                })
                .send()
                .then(async response => {
                    const audioLocales = response.body.features;
                    // console.log(audioLocales);
                    for (let i = 0; i < audioLocales.length; i++) {
                        const coord = [audioLocales[i].center[0], audioLocales[i].center[1]]
                        console.log(coord);
                        await addMarker(coord);
                    }
                })
            )
        } )
    }

    function addMarker(coord) {
      console.log(coord);
      new mapboxgl.Marker({
        color: "red",
      })
        .setLngLat(coord)
        .addTo(map.current);
    }

    const handleSetLocation = e => { 
        e.preventDefault();
        setLocation(e.target.value)
        // console.log(e.target.value);
    }

    const handleSubmit  = e => { 
        e.preventDefault();
        convertAudioFileLocations();
        geocoder.forwardGeocode({
            query: location,
        })
        .send()
        .then(function(response) {
            // console.log(response.body.features[0].center)
            locationLng = response.body.features[0].center[0];
            locationLat = response.body.features[0].center[1];
            setCoordinates(locationLng, locationLat);
            map.current.flyTo({center:[locationLng, locationLat], zoom: 15});
        });
    };
    
    return (
        <>      
        <div ref={mapContainer} className="map-container">
            <div className="sidebar">
            Longitude: <div id="lng">{coordinates[0]}</div> | Latitude: <div id="lng">{coordinates[1]}</div> | Zoom: {zoom}
            </div>
            <div className="input-address">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="location">Address</label>
                    <input type="text" id="location" name="location" value={location} onChange={handleSetLocation} />
                    <button type="submit">Find NabeTones in Your Area</button>
               </form>
            </div>
        </div>
        </>
    )  
}
