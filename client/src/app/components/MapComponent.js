'use client '
// components/MapComponent.js

import React, { useState, useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

const MapComponent = ({ pharmacies }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyAssKRtf0Bm09maIeOiUbV5rTKHYLBzAS8"
      
    });

    loader.load().then(() => {
      const google = window.google;
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 8,
      });
      setMap(map);
    });
  }, []);

  useEffect(() => {
    if (map) {
      pharmacies.forEach((pharmacy, index) => {
        new window.google.maps.Marker({
          position: { lat: pharmacy.latitude, lng: pharmacy.longitude },
          map: map,
          title: pharmacy.name,
        });
      });
    }
  }, [map, pharmacies]);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default MapComponent;
