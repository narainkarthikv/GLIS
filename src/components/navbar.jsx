import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './css/navbar.css'; 

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-title">GLIS</div>
      <div className="navbar-links">
        <a href="/home" className="navbar-link">Home</a>
        <a href="/user" className="navbar-link">
          <FontAwesomeIcon icon={faChartLine} /> Dashboard
        </a>
        <a href="/user" className="navbar-link">
          <FontAwesomeIcon icon={faUser} /> User
        </a>
      </div>
    </div>
  );
};

export default Navbar;
