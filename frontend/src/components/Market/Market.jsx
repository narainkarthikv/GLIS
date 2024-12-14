import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animations/loading.json';
import './css/Market.css';

const Market = () => {
  const [marketPlaces, setMarketPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    fetchMarketPlaces();
  }, []);

  const fetchMarketPlaces = async () => {
    try {
      const response = await axios.get('https://glis-stats-on-view.onrender.com/api/bus-stations');
      const placesWithMarket = response.data;
      const filteredMarkets = placesWithMarket.filter(place => place.MarketInfrastructure === 'true');
      setMarketPlaces(filteredMarkets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching market places:', error);
      setError('Error fetching market places. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const filterPlaces = () => {
      if (searchQuery === '') {
        setFilteredPlaces(marketPlaces);
      } else {
        const filtered = marketPlaces.filter(place => (
          place.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.Reg.toLowerCase().includes(searchQuery.toLowerCase())
        ));
        setFilteredPlaces(filtered);
      }
    };
    filterPlaces();
  }, [searchQuery, marketPlaces]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='Market'>
      {loading ? (
        <div className="loading-animation">
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <div className='Search-Bar'>
              <input 
                type="text" 
                placeholder="🔍 Search by Name or Region" 
                value={searchQuery} 
                onChange={handleSearchChange} 
                className="search-input" 
              />
          </div>
          <div className='Market-container'>
              {filteredPlaces.length === 0 ? (
                <h3 className='Market-filtered-msg'>No matching places found.</h3>
              ) : (
                filteredPlaces.map(place => (
                  <div className='Market-list-box' key={place.ID}>
                    <h3 className='Market-list-item-content'>{place.Name}</h3>
                    <h3 className='Market-list-item-content'>{place.Reg}</h3>
                    <Link className='Market-list-item-content' to={`/MarketView/${place.ID}`}>
                      <FaArrowRight className='arrow-icon' />
                    </Link>
                  </div>
                ))
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Market;
