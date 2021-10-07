import React from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useState, useEffect } from "react";
import axios from "axios";
mapboxgl.accessToken =
  "pk.eyJ1IjoibXphY2hhcmlhaCIsImEiOiJja3RlNWt6dzIwNHJjMndxbjV3bnlpcmU2In0.7MRhuJXrG3GmAbv65IIEew";
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocoder = mbxGeocoding({ accessToken: mapboxgl.accessToken });

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
  let coord;
  // audio file locations
  const [audioFileLocations, setAudioFileLocations] = useState([]);
  let audioId;
  let audioTitle;
  let audioPath;
  const API_URL = "http://localhost:5005";

  // get all audio files + coordinates from user to populate the map
  const getAllAudioFiles = () => {
    // get request to the server
    axios
      .get(`${API_URL}/api/audiofiles`)
      .then( (response) => {
        // console.log(response.data)
        setAudioFileLocations(response.data);
      })
      .catch((err) => console.log(err));
  };

  // convert / forward geocode the input address to coordinates
  const getAudioFileLocations = () => {
    for (let i = 0; i < audioFileLocations.length; i++) {
      geocoder
        .forwardGeocode({
          query: audioFileLocations[i].location,
        })
        .send()
        // eslint-disable-next-line no-loop-func
        .then((response) => {
          // get coordinates from first object of array (most accurate to address)
          const audioLocales = response.body.features[0];
          // console.log(audioLocales);
          // populate the coordinates
          coord = [audioLocales.center[0], audioLocales.center[1]];
          audioId = audioFileLocations[i]._id;
          audioTitle = audioFileLocations[i].title;
          audioPath = audioFileLocations[i].audioPath;
          addMarker(coord, audioId, audioTitle, audioPath);
        });
    }
  };

  useEffect(() => {
    getAllAudioFiles();
    // initialize map only once
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mzachariah/ckue5feo1132o17qljqbw0dsn",
      center: [coordinates[0], coordinates[1]],
      zoom: zoom,
    });
    // add geolocation
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
    });
    map.current.addControl(geolocate);    
  }, []);

  const handleOnGeoLocate = () => {
    // Unfortunately audio files don't repopulate when clicking to find your location
    // For now, an invisible button appears behind the geolocate button as I cannot place it on top of the geolocate button
    // I can only populate getAudioFileLocations() on the mapbox click event. 
    map.current.on('click', () => {
        console.log("hey");
      getAudioFileLocations();
    });
  }

  function addMarker(coord, id, audioTitle, audioPath) {
    const audioIdString = `/tones/${id}`;
    new mapboxgl.Marker({
      color: "red",
    });
    new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      closeOnMove: false,
      maxWidth: "auto"
    })
      .setHTML(
        // Linking audio player instead
        `<div><a href=${audioIdString}>${audioTitle}</a></div><div><audio src=${audioPath} controls /></div>`
      )
      .setLngLat(coord)
      .addTo(map.current);
  }

  const handleSetLocation = (e) => {
    e.preventDefault();
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getAudioFileLocations();
    // convert address inputed by user
    geocoder
      .forwardGeocode({
        query: location,
      })
      .send()
      .then(function (response) {
        // console.log(response.body.features[0].center)
        locationLng = response.body.features[0].center[0];
        locationLat = response.body.features[0].center[1];
        map.current.flyTo({ center: [locationLng, locationLat], zoom: 15 });
      });
  };
  if(!audioFileLocations) {
      return<></>
  }
  return (
    <>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="location">Address</label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={handleSetLocation}
            />
            <div><button type="submit">Discover Nabetones in Your Area</button></div>
          </form>
        </div>
      <div ref={mapContainer} className="map-container">
        <div className="sidebar">
          Longitude: <div id="lng">{coordinates[0]}</div> | Latitude:{" "}
          <div id="lng">{coordinates[1]}</div> | Zoom: {zoom}
        </div>
        <div className="secret-button">
        <button onClick={handleOnGeoLocate}>Test Click</button>
        </div>
      </div>
    </>
  );
}
