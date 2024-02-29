"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [city, setCity] = useState('');
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log(position.coords);
    });
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
        .then(response => {
          const city = response.data.address.city;
          setCity(city);
          console.log('City:', city); 
          axios.get(`http://localhost:3001/${city}`) 
            .then(response => {
              const nearbyPharmacies = response.data.filter(pharmacy => {
                
                return true; 
              });
              setPharmacies(nearbyPharmacies);
            })
            .catch(error => {
              console.error('Error fetching pharmacies:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching city:', error);
        });
    }
  }, [latitude, longitude]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Pharmacies in {city}</h1>
      <ul className="grid grid-cols-1 gap-4">
        {pharmacies.map((pharmacy, index) => (
          <li key={index} className="p-4 border rounded-md text-white">
            <span className="font-semibold">{pharmacy.name}</span>
            <p>{pharmacy.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
