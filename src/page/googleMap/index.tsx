import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";


const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 25.4506583, // Example: Melbourne Latitude
  lng: 82.9601375, // Example: Melbourne Longitude
};

const GoogleMapComponent = () => {
  const API_KEY = import.meta.env.GOOGLE_MAP_API_KEY
  const GOOGLE_MAP_API_KEY = 'AIzaSyALHrIGGueT0T5jncR-MX2gHa9tCJ__FjY'
  const locations = [
    { lat: 25.4506583, lng: 82.9601375 },
    { lat: 25.450495, lng: 82.9598879 },
    { lat: 25.4500064, lng: 82.9579059 },
  ];

  console.log('API_KEY', { API_KEY, GOOGLE_MAP_API_KEY })
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>

      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>;
    </LoadScript>
  );
};

export default GoogleMapComponent;
