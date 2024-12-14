import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowRight, FaSort } from 'react-icons/fa6';
import { Link } from 'react-router-dom'; // Import Lin
import './css/Data.css'

const TableView = () => {
  const [busStations, setBusStations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    fetchBusStations();
  }, []);

  const fetchBusStations = async () => {
    try {
      const response = await axios.get('https://glis-stats-on-view.onrender.com/api/bus-stations');
      setBusStations(response.data);
    } catch (error) {
      console.error('Error fetching bus stations:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortType(event.target.value);
  };

  const filteredBusStations = busStations.filter( station => (
    station.Name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    station.Reg.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.Zone_type.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const sortedBusStations = filteredBusStations.sort((a, b) => {
    if (sortType === 'ID') {
      return a.ID - b.ID;
    } 
    else if (sortType === 'Name') {
      return a.Name.localeCompare(b.Name);
    } 
    else if (sortType === 'Reg') {
      return a.Reg.localeCompare(b.Reg);
    } 
    else if (sortType === 'Revenue') {
      return a.Rev - b.Rev;
    } 
    else if (sortType === 'Year') {
      return a.Year - b.Year;
    }
    else if (sortType === 'Zone_type') {
      return a.Zone_type.localeCompare(b.Zone_type);
    } 
    return 0;
  });

  return (
    <div className='Data'>
      <div className='search-container'>

        <input
          className='search-bar'
          placeholder="🔍 Search By Name, Region, Zone Type"
          value={searchTerm}
          onChange={handleSearch}
        />

        <select className='sort-btn' value={sortType} onChange={handleSort}>
          <option value="ID">ID</option>
          <option value="Name">Name</option>
          <option value="Reg">Region</option>
          <option value="Revenue">Revenue</option>
          <option value="Year">Year</option>
          <option value="Zone_type">Zones</option>
        </select>

        <h3><FaSort className='sort-icon'/></h3>
      </div>
  
      <table className='tableview-container'>
        <thead>
          <tr>
            <th className='tableview-head'>ID</th>
            <th className='tableview-head'>Name</th>
            <th className='tableview-head'>Location Body</th>
            <th className='tableview-head'>Region</th>
            <th className='tableview-head'>Revenue</th>
            <th className='tableview-head'>Zone Type</th>
            <th className='tableview-head'>Year</th>
            <th className='tableview-head'>More Details</th>
          </tr>
        </thead>
        <tbody>
          {sortedBusStations.map((station) => (
            <tr className='tableview-row' key={station.ID}>
              <td className='tableview-row-data'>{station.ID}</td>
              <td className='tableview-row-data'>{station.Name}</td>
              <td className='tableview-row-data'>{station.Local }</td>
              <td className='tableview-row-data'>{station.Reg}</td>
              <td className='tableview-row-data'>{station.Rev}</td>
              <td className='tableview-row-data'>{station.Zone_type}</td>
              <td className='tableview-row-data'>{station.Year}</td>
              {/* <Recordview id={station.ID} /> */}
              <td className='tableview-row-data'>
                {/* Pass ID to Recordview component */}
                <Link className='table-link' to={`/RecordView/${station.ID}`}><FaArrowRight className='table-arrow-icon'/></Link>
              </td>
            </tr>
           
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
