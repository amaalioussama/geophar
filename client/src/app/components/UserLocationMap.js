"use client"

import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToString } from "react-dom/server";
import MyLocationIcon from '@mui/icons-material/MyLocation';

const UserLocationMap = ({ userLocation, markers }) => {
  useEffect(() => {
    if (!userLocation) return;

    var container = L.DomUtil.get("map");

    if (container != null) {
      container._leaflet_id = null;
    }
    var map = L.map("map").setView(userLocation, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoidGFyLWhlbCIsImEiOiJjbDJnYWRieGMwMTlrM2luenIzMzZwbGJ2In0.RQRMAJqClc4qoNwROT8Umg",
    }).addTo(map);

 
    const iconSvgString = renderToString(<MyLocationIcon fontSize="large" />);


    const userIcon = L.icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(iconSvgString)}`,
      iconSize: [24, 24], 
    });

    L.marker(userLocation, { icon: userIcon }).addTo(map)
      .bindPopup("<b>Your Location</b>")
      .openPopup();

  }, [userLocation, markers]);

  return <div id="map" style={{ height: "400px", width: "80%" }}></div>;
};

export default UserLocationMap;
