'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserLocationMap from "./UserLocationMap";

const Home = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [userCity, setUserCity] = useState("");
  const [street, setStreet] = useState("");
  const [pharmacies, setPharmacies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        fetchCityAndStreet(latitude, longitude);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  };

  const fetchCityAndStreet = (latitude, longitude) => {
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      )
      .then((response) => {
        const city = response.data.address.city;
        setUserCity(city);
        const street = response.data.address.road;
        setStreet(street);
        fetchPharmacies(city, street);
      })
      .catch((error) => {
        console.error("Error fetching city and street:", error);
      });
  };

  const fetchPharmacies = (city, street) => {
    axios
      .get(`http://localhost:3001/${city}/${street}`)
      .then((response) => {
        setPharmacies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pharmacies:", error);
      });
  };

  const handleLocalsearch = async () => {
    try {
      await axios.post("http://localhost:3001/localsearch");
      fetchPharmacies(userCity, street); 
    } catch (error) {
      if (error.response && error.response.status === 401) {
      
        router.push("/login");
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
    
      <div className="container mx-auto px-4 py-20 bg-white text-gray-800">
  
        <div className="flex items-center justify-center h-full">
          <button
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded flex justify-center items-center"
            onClick={fetchUserLocation}
          >
            Get Permission for Geolocation
          </button>
        </div>

  
        <div className="mt-8 flex items-center justify-center h-full ">
          <UserLocationMap userLocation={userLocation} markers={pharmacies} />
        </div>

     
        <div className="mt-8 flex flex-col items-center justify-center h-full">
          <h2 className="text-xl font-bold mb-4">
            Pharmacies in {userCity}
          </h2>
          <ul className="w-full max-w-md">
            {pharmacies.map((pharmacy, index) => (
              <li
                key={index}
                className="border-b border-gray-300 py-4 flex flex-col"
              >
                <div>
                  <h3 className="font-bold">{pharmacy.name}</h3>
                  <p className="text-gray-600">{pharmacy.address}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
