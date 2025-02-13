import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Icon } from "leaflet";
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animations/loading.json';
import './css/MapLinking.css';

import commercialPlaceholder from '../../assets/images/commercial-placeholder.png';
import governmentPlaceholder from '../../assets/images/government-placeholder.png';
import parkPlaceholder from '../../assets/images/park-placeholder.png';

const Maplinking = () => {
  const [geocode, setGeocode] = useState([]);
  const [zoneTypes, setZoneTypes] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [filteredGeocode, setFilteredGeocode] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGeocode = async () => {
      try {
        const response = await axios.get('https://glis-yqvt.onrender.com/api/bus-stations');
        const data = response.data;
        setGeocode(data);
        const types = [...new Set(data.map(geo => geo.Zone_type))];
        setZoneTypes(types);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching geocode:', error);
        setLoading(false);
      }
    };

    fetchGeocode();
  }, []);

  useEffect(() => {
    if (selectedZone) {
      const filteredData = geocode.filter(geo => geo.Zone_type === selectedZone);
      setFilteredGeocode(filteredData);
    } else {
      setFilteredGeocode(geocode);
    }
  }, [selectedZone, geocode]);

  const fetchIcon = (ZoneType) => {
    let icon;
    if (ZoneType === 'Commercial') {
      icon = CommercialIcon;
    } else if (ZoneType === 'Government') {
      icon = GovernmentIcon;
    } else if (ZoneType === 'Park') {
      icon = ParkIcon;
    }
    return icon;
  }

  const CommercialIcon = new Icon({
    iconUrl: commercialPlaceholder,
    iconSize: [38, 38]
  });

  const GovernmentIcon = new Icon({
    iconUrl: governmentPlaceholder,
    iconSize: [38, 38]
  });

  const ParkIcon = new Icon({
    iconUrl: parkPlaceholder,
    iconSize: [38, 38]
  });

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedZone(selectedValue);
  };

  return (
    <div className="map-container">
      {loading ? (
        <div className="loading-animation">
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
      ) : (
        <>
          <div className="filter-container">
            <label className="filter-label" htmlFor="zoneFilter">Filter by Zone Type: </label>
            <select className="filter-control" id="zoneFilter" onChange={handleFilterChange} value={selectedZone}>
              <option value="">All ({geocode.length})</option>
              {zoneTypes.includes('Government') && (
                <option value="Government">
                  Government ({geocode.filter(geo => geo.Zone_type === 'Government').length})
                </option>
              )}
              {zoneTypes.includes('Commercial') && (
                <option value="Commercial">
                  Commercial ({geocode.filter(geo => geo.Zone_type === 'Commercial').length})
                </option>
              )}
              {zoneTypes.includes('Park') && (
                <option value="Park">
                  Park ({geocode.filter(geo => geo.Zone_type === 'Park').length})
                </option>
              )}
            </select>
          </div>
          <MapContainer center={[13.0505, 80.2241]} zoom={12}>
            <TileLayer
              attribution="glis"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredGeocode.map((geo, index) => (
              <Marker key={index} position={[geo.lat, geo.long]} icon={fetchIcon(geo.Zone_type)}>
                <Popup>
                  <div className="popup-container">
                    <h4>ID: {geo.ID}</h4>
                    <h4>Name: {geo.Name}</h4>
                    <h4>Local: {geo.Local}</h4>
                    <h4>Zone Type: {geo.Zone_type}</h4>
                    <h4>Market Infrastructure: {geo.MarketInfrastructure === 'true' ? 'Yes' : 'No'}</h4>
                    <h4>Year: {geo.Year}</h4>
                    <h4>Latitude: {geo.lat}</h4>
                    <h4>Longitude: {geo.long}</h4>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          <div className="legend-container">
            <div className="legend-item">
              <img className="legend-item-img" src={governmentPlaceholder} alt="Government" />
              <span className="legend-item-span">Government</span>
            </div>
            <div className="legend-item">
              <img className="legend-item-img" src={commercialPlaceholder} alt="Commercial" />
              <span className="legend-item-span">Commercial</span>
            </div>
            <div className="legend-item">
              <img className="legend-item-img" src={parkPlaceholder} alt="Park" />
              <span className="legend-item-span">Park</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Maplinking;
