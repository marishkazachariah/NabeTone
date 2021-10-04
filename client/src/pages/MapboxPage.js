import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useState, useEffect } from 'react';
mapboxgl.accessToken = "pk.eyJ1IjoidHJhbnNpcmVudCIsImEiOiJja255bXRtZGowbHF0MnBvM3U4d2J1ZG5vIn0.IVcxB9Xw6Tcc8yHGdK_0zA";
export default function MapboxPage() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(13.3983);
    const [lat, setLat] = useState(52.5124);
    const [zoom, setZoom] = useState(11);

    // input field of address
    const [location, setLocation] = useState("");

    useEffect(() => {
        // initialize map only once
        if (map.current) return; 
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center:[lng, lat],
            zoom: zoom
        });
    });

    // setting up the initial map
    // useEffect(() => {
    //     if (!map.current) return;
    //     map.current.on('move', () => {
    //         setLng(map.current.getCenter().lng.toFixed(4));
    //         setLat(map.current.getCenter().lat.toFixed(4));
    //         setZoom(map.current.getZoom().toFixed(2));
    //     });
    // });

    // TODO: fill in coordinates from user to populate the map

    useEffect(() => {
        if (!map.current) return;
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
        // Add the geolocate control to the map
        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                // When active the map will receive updates to the device's location as it changes
                trackUserLocation: true,
                showUserHeading: true,
            })
        );
    }, []);

    const handleSetLocation = e => {
        e.preventDefault();
        const coordinates = [lng, lat];
        console.log(coordinates);
    }
    
    return (
        <>      
        <div ref={mapContainer} className="map-container">
            <div className="sidebar">
            Longitude: <div id="lng">{lng}</div> | Latitude: <div id="lng">{lat}</div> | Zoom: {zoom}
            </div>
            <div className="input-address">
                <form>
                    <label htmlFor="location">Address</label>
                    <input type="text" id="location" name="location" value={location} onChange={handleSetLocation} />
                    <button type="submit">Find NabeTones in Your Area</button>
               </form>
            </div>
        </div>
        </>
    )  
}
