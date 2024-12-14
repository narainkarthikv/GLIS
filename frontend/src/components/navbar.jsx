import React from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import './css/navbar.css';
import { FaDatabase, FaDoorOpen, FaMap, FaPlusCircle } from 'react-icons/fa';
import { FaLandmarkFlag, FaShop } from 'react-icons/fa6';

const Navbar = () => {

  // const [userRole, setUserRole] = useState('');

  // useEffect(() => {

  //   const fetchUserRole = async () => {

  //     try {
  //       const response = await axios.get('https://glis-backend.onrender.com/api/user');
  //       const user = response.data;
  //       console.log(user);
  //       setUserRole(user[0].role);
  //     } catch (error) {
  //       console.error('Error fetching user role:', error);
  //     }
  //   };
  
  //   fetchUserRole();
  // }, []);

  return (
    <div className="navbar">
      <div className="navbar-links">
        <Link to="/" className="navbar-title">GLIS</Link>
        {/* {userRole === 'governmentOfficial' && ( */}
          <Link to="/data" className="navbar-link">
            <FaDatabase className='navbar-icon' /> Data
          </Link>
        {/* )} */}
        <Link to="/Map" className="navbar-link">
          <FaMap className='navbar-icon' /> Map
        </Link>
        <Link to='/Agri' className='navbar-link'>
          <FaLandmarkFlag className='navbar-icon' /> Agriculture Lands
        </Link>
        <Link to='/Agri/add' className='navbar-link'>
          <FaPlusCircle className='navbar-icon'/> Add Lands
        </Link>
        <Link to='/Market' className='navbar-link'>
          <FaShop className='navbar-icon'/> Market
        </Link>
      </div>
      <a href='/login' tooltip='logout' className='navbar-logout'> <FaDoorOpen className='navbar-logout-icon'/> <span className='tooltip-logout'>logout</span> </a>
    </div>
  );
};

export default Navbar;