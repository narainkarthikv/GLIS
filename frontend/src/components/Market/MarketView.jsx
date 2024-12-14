import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowRight, FaPlusCircle } from 'react-icons/fa';
import Crop from './Crop';
import './css/MarketView.css';

const MarketView = () => {
  const { id } = useParams();
  const [busStation, setBusStation] = useState({});
  const [marketData, setMarketData] = useState(null);
  const [newCropData, setNewCropData] = useState({ Name: '', Price: '', Quantity: '' });
  const [cropQuantities, setCropQuantities] = useState({}); 
  const [showRefillForm, setShowRefillForm] = useState(false);

  useEffect(() => {
    const isRefillRequired = Object.values(cropQuantities).some(quantity => quantity <= 25);
    setShowRefillForm(isRefillRequired);
  }, [cropQuantities]);

  useEffect(() => {
    fetchBusStation(id);
    fetchMarketData(id);
  }, [id]);

  const fetchBusStation = async (id) => {
    try {
      const response = await axios.get(`https://glis-stats-on-view.onrender.com/api/bus-stations/${id}`);
      setBusStation(response.data);
    } catch (error) {
      console.error('Error fetching bus station:', error);
    }
  };

  const fetchMarketData = async (id) => {
    try {
      const response = await axios.get(`https://glis-stats-on-view.onrender.com/api/market/${id}`);
      setMarketData(response.data);
      if (response.data && response.data.Crops) {
        const quantities = {};
        response.data.Crops.forEach(crop => {
          quantities[crop._id] = crop.Quantity;
        });
        setCropQuantities(quantities);
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  const updateCropQuantity = async (cropId, newQuantity) => {
    try {
      await axios.put(`https://glis-stats-on-view.onrender.com/api/market/${id}/crops/${cropId}`, { Quantity: newQuantity });
      fetchMarketData(id);
    } catch (error) {
      console.error('Error updating crop quantity:', error);
    }
  };
  
  const incrementQuantity = (cropId) => {
    const updatedQuantity = parseInt(cropQuantities[cropId]) + 1;
    setCropQuantities(prevState => ({
      ...prevState,
      [cropId]: updatedQuantity
    }));
    updateCropQuantity(cropId, updatedQuantity);
  };

  const decrementQuantity = (cropId) => {
    if (parseInt(cropQuantities[cropId]) > 0) {
      const updatedQuantity = parseInt(cropQuantities[cropId]) - 1;
      setCropQuantities(prevState => ({
        ...prevState,
        [cropId]: updatedQuantity
      }));
      updateCropQuantity(cropId, updatedQuantity);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  
    const isCropExists = marketData.Crops.some(crop => crop.Name.toLocaleLowerCase() === newCropData.Name.toLocaleLowerCase());
  
    if (isCropExists) {
      alert('Crop with this name already exists!');
      return;
    }
  
    const crop = {
      Name: newCropData.Name,
      Price: newCropData.Price,
      Quantity: parseInt(newCropData.Quantity)
    };
  
    axios.post(`https://glis-stats-on-view.onrender.com/api/market/${id}/crops`, crop)
      .then(res => {
        const newCropId = res.data.Crops.find(c => c.Name === newCropData.Name)._id; // Find the ID of the newly added crop
        setMarketData(res.data);
        setCropQuantities(prevState => ({
          ...prevState,
          [newCropId]: parseInt(newCropData.Quantity)
        }));
        setNewCropData({ Name: '', Price: '', Quantity: '' });
      })
      .catch(error => {
        console.error('Error Creating Crop:', error);
      });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCropData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const deleteCrop = (cropId) => {
    axios.delete(`https://glis-stats-on-view.onrender.com/api/market/${id}/crops/${cropId}`)
      .then(res => {
        console.log(res.data);
        fetchMarketData(id);
      })
      .catch(error => {
        console.error('Error deleting Crop:', error);
      });
  };
  const date = new Date();

  return (
    <div className='MarketView'>
        <div className='Market-header-container'>
          <h2 className='Market-header'>Market Information for ID: {busStation.ID}</h2>
          <h2 className='Market-header'>Market Name: {busStation.Name}</h2>
          <h2 className='Market-header-Date'>Date: {date.getDate()} / {date.getMonth()} / {date.getFullYear()}</h2>
        </div>
        {showRefillForm && (
        <div>
          <form className='warning-form' action="https://formsubmit.co/narainkarthik812@gmail.com" method="POST">
            <input id="warning" name="warning" onChange={handleChange} placeholder='Type the Message to be sent' className='Warning-Form-input' autoComplete='true' required />
            <button type="submit" className='Warning-Form-btn'><FaArrowRight /></button>
          </form>
        </div>
        )}
      <div className='Crop-Add-form'>
        <h3 className='Crop-Add'>Add New Crop:</h3>
        <form onSubmit={onSubmit}>
          <input id="Name" className='Crop-Add-input' name="Name" value={newCropData.Name} onChange={handleChange} placeholder="Crop Name" autoComplete='true' />
          <input id="Quantity" className='Crop-Add-input' name="Quantity" value={newCropData.Quantity} onChange={handleChange} placeholder="Quantity" autoComplete='true' />
          <input id="Price" className='Crop-Add-input' name="Price" value={newCropData.Price} onChange={handleChange} placeholder="Price" autoComplete='true' />
          <button className='Crop-Add-btn' type="submit"> <FaPlusCircle /> </button>
        </form>
      </div>
     
      <h3 className='Crops-info-header'>Crops Information</h3>
      <div className='Crops-container'>
        {marketData && marketData.Crops && marketData.Crops.length > 0 ? (
          marketData.Crops.map((crop, index) => (
            <Crop
              key={index}
              crop={crop}
              quantity={cropQuantities[crop._id]}
              incrementQuantity={() => incrementQuantity(crop._id)}
              decrementQuantity={() => decrementQuantity(crop._id)}
              deleteCrop={() => deleteCrop(crop._id)}
            />
          ))
        ) : (
          <div>No crops available for this market.</div>
        )}
      </div>
    </div>
  );
};

export default MarketView;
