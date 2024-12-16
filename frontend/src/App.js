import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import TableView from './components/Data/Data.jsx';
import Recordview from './components/Data/RecordView.jsx';
import LoginPage from './components/login/LoginPage.jsx';
import SignUp from './components/login/SignUp.jsx';
import Map from './components/Map/MapLinking.jsx';
import Landview from './components/Agri/LandView.jsx';
import Landform from './components/Agri/LandForm.jsx'
import Market from './components/Market/Market.jsx';
import MarketView from './components/Market/MarketView.jsx';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className='App'>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path='/login' element={isLoggedIn?<Dashboard/>:<LoginPage isAuthenticated={isLoggedIn} setIsAuthenticated={setIsLoggedIn} />} />
          <Route exact path='/' element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path='/Data' element={isLoggedIn ? <TableView /> : <Navigate to="/login" />} />
          <Route path='/Market' element={isLoggedIn ? <Market /> : <Navigate to="/login" />} />
          <Route path='/MarketView/:id' element={isLoggedIn ? <MarketView /> : <Navigate to="/login" />} />
          <Route path='/Map' element={isLoggedIn ? <Map /> : <Navigate to="/login" />} />
          <Route path='/RecordView/:id' element={isLoggedIn ? <Recordview /> : <Navigate to="/login" />} />
          <Route path='/Agri' element={isLoggedIn ? <Landview/> : <Navigate to="/login" />} />
          <Route path='/Agri/add' element={isLoggedIn ? <Landform /> : <Navigate to="/login" />} />
          <Route path='/signup'element={<SignUp/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;