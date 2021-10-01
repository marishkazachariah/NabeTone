import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = "pk.eyJ1IjoidHJhbnNpcmVudCIsImEiOiJja255bXRtZGowbHF0MnBvM3U4d2J1ZG5vIn0.IVcxB9Xw6Tcc8yHGdK_0zA";

export default function MapboxPage() {
    return (
        <div class="map-view" id="map-view">
        <div id="map"></div> 
        <script src="../../public/js/mapbox.js"></script>	
        </div>
    )
}
