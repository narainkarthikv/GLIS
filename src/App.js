// App.js
import React from 'react';
// import { Grid } from '@mui/material';
// import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import Dashboard from './components/dashboard';

function App() {
  return (
    <div>
          <Navbar/>
          {/* <Sidebar/> */}
          <Dashboard />
    </div>
      
   
  );
}

export default App;
