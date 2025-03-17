import React, { memo } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 25.4506583, // Example: Varanasi Latitude
  lng: 82.9601375, // Example: Varanasi Longitude
};

const GoogleMapComponent: React.FC = () => {
  const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const locations = [
    { lat: 25.4506583, lng: 82.9601375 },
    { lat: 25.4500064, lng: 82.9579059 },
  ];

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>;
    </LoadScript>
  );
};

export default memo(GoogleMapComponent);
