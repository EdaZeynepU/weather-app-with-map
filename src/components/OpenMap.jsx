import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import { Icon } from "leaflet";
import HomeI from "../../public/home.png";
import LocationIcon from "../../public/loc-icon.png";

const LocationMarker = ({ setLocation }) => {
  const locIcon = new Icon({
    iconUrl: LocationIcon,
    iconSize: [45, 45],
  });
  const [position, setPosition] = useState(null);
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      setLocation([
        Math.round(lat * 1000) / 1000,
        Math.round(lng * 1000) / 1000,
      ]);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={locIcon}></Marker>
  );
};

LocationMarker.propTypes = {
  setLocation: PropTypes.func,
};

const OpenMap = ({ location, setLocation }) => {
  const [home, setHome] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        setHome(coords);
      });
    }
  }, []);

  const homeIcon = new Icon({
    iconUrl: HomeI,
    iconSize: [60, 60],
  });
  return (
    <div>
      <MapContainer
        center={location}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker setLocation={setLocation} />
        {home ? (
          <Marker
            position={home}
            icon={homeIcon}
            title="this is where you are"
          ></Marker>
        ) : (
          <div></div>
        )}
      </MapContainer>
    </div>
  );
};

OpenMap.propTypes = {
  location: PropTypes.array,
  setLocation: PropTypes.func,
};

export default OpenMap;
