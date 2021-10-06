import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
mapboxgl.accessToken = "pk.eyJ1IjoibXphY2hhcmlhaCIsImEiOiJja3RlNWt6dzIwNHJjMndxbjV3bnlpcmU2In0.7MRhuJXrG3GmAbv65IIEew";
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const geocoder = mbxGeocoding({accessToken: mapboxgl.accessToken});

export default function MapboxPage(props) {
    
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
    let audioId;
    let audioTitle;
    let audioCoords;


    const API_URL = 'http://localhost:5005';

    // get all coordinates from user to populate the map
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
            style: 'mapbox://styles/mzachariah/ckue5feo1132o17qljqbw0dsn',
            center:[coordinates[0], coordinates[1]],
            zoom: zoom
        });
        getAllAudioFiles();
    }, []);

    // convert / forward geocode the input address to coordinates 
    const convertAudioFileLocations = () => {
        const inputCoords = [Math.round(coordinates[0] * 10)/10, Math.round(coordinates[1] * 10)/10 ];
        // console.log(inputCoords);
        const getAudioFileLocations = audioFileLocations.map((audioLocation) => {
            return (
                geocoder.forwardGeocode({
                    query: audioLocation.location
                })
                .send()
                .then(async response => {
                    // get coordinates from first object of array (most accurate to address)
                    const audioLocales = response.body.features[0]; 
                    // console.log(audioLocales);
                    
                    // populate the coordinates
                    const coord = [audioLocales.center[0], audioLocales.center[1]];
                    audioId = audioLocation._id;
                    audioTitle = audioLocation.title;
                    await addMarker(coord, audioId, audioTitle);
                    const audioCoordLng = Math.round(audioLocales.center[0] * 10)/10;
                    const audioCoordLat = Math.round(audioLocales.center[1] * 10)/10;
                    audioCoords = [audioCoordLng, audioCoordLat];
                    return audioCoords;
                })
            )
        } )
        console.log(getAudioFileLocations);
    }
  
    function addMarker(coord, id, audioTitle) {
      // TODO: figure out why the :id is not working
      const audioIdString = `/tones/${id}`;
      const titleOfAudio = audioTitle;
      new mapboxgl.Marker({
        color: "red",
      });
      new mapboxgl.Popup({
        closebutton: true,
        closeOnClick: false,
        closeOnMove: false,
      })
        .setHTML(
          `<div><button><a href=${audioIdString}>${titleOfAudio}</a></button></div>`
        )
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
