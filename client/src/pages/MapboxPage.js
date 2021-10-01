import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useState, useEffect } from 'react';
mapboxgl.accessToken = "pk.eyJ1IjoidHJhbnNpcmVudCIsImEiOiJja255bXRtZGowbHF0MnBvM3U4d2J1ZG5vIn0.IVcxB9Xw6Tcc8yHGdK_0zA";
export default function MapboxPage() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

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

    useEffect(() => {
        if (!map.current) return;
        map.current.on('move', () => {
            setLng(map.current.getCenter().llng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <>
        <div class="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
        </>
    )  
}
