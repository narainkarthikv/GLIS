import React from 'react';
import { Link } from 'react-router-dom';
import { FaDatabase, FaDoorOpen, FaMap, FaPlusCircle } from 'react-icons/fa';
import { FaLandmarkFlag, FaShop } from 'react-icons/fa6';

const navItems = [
  { to: "/Data", icon: FaDatabase, label: "Data" },
  { to: "/Map", icon: FaMap, label: "Map" },
  { to: "/Agri", icon: FaLandmarkFlag, label: "Agriculture Lands" },
  { to: "/Agri/add", icon: FaPlusCircle, label: "Add Lands" },
  { to: "/Market", icon: FaShop, label: "Market" },
];

const Navbar = () => {
  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/" className="text-white text-xl font-bold">GLIS</Link>
        {navItems.map(({ to, icon: Icon, label }) => (
          <Link key={to} to={to} className="text-gray-300 hover:text-white flex items-center space-x-1">
            <Icon className='navbar-icon' /> <span>{label}</span>
          </Link>
        ))}
      </div>
      <a href='/login' tooltip='logout' className='text-gray-300 hover:text-white flex items-center space-x-1'>
        <FaDoorOpen className='navbar-logout-icon'/> <span className='tooltip-logout'>logout</span>
      </a>
    </div>
  );
};

export default Navbar;