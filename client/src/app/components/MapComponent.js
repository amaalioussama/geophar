import { useState, useEffect } from 'react';

const MapComponent = ({ pharmacies, userCoords }) => {
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !mapInitialized && userCoords) {
      import('leaflet').then(L => {
        // Initialize map
        const mapInstance = L.map('map').setView([userCoords.latitude, userCoords.longitude], 13);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);
        
        setMapInitialized(true);
      }).catch(error => {
        console.error('Error loading Leaflet:', error);
      });
    }
  }, [mapInitialized, userCoords]);

  return <div id="map" style={{ height: '400px' }}></div>;
};

export default MapComponent;
