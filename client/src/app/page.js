
'use client'
 
 // pages/index.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './components/MapComponent';

const Home = () => {
  const [userCity, setUserCity] = useState('');
  const [street, setStreet] = useState('');
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchCityAndStreet(latitude, longitude);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  };

  const fetchCityAndStreet = (latitude, longitude) => {
    axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
      .then(response => {
        const city = response.data.address.city;
        setUserCity(city);
        const street = response.data.address.road;
        setStreet(street);
        fetchPharmacies(city, street);
      })
      .catch(error => {
        console.error('Error fetching city and street:', error);
      });
  };

  const fetchPharmacies = (city, street) => {
    axios.get(`http://localhost:3001/${city}/${street}`)
      .then(response => {
        setPharmacies(response.data);
      })
      .catch(error => {
        console.error('Error fetching pharmacies:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Pharmacy Finder</h1>
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={fetchUserLocation}>Get My Location</button>
      <div className="mt-4">
        {userCity && <p className="text-lg font-semibold">Detected City: {userCity}</p>}
        {street && <p className="text-lg font-semibold">Detected Street: {street}</p>}
      </div>
      <div className="mt-8">
        <MapComponent pharmacies={pharmacies} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Pharmacies in {userCity}</h2>
        <ul>
          {pharmacies.map((pharmacy, index) => (
            <li key={index}>
              <h3>{pharmacy.name}</h3>
              <p>{pharmacy.address}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
