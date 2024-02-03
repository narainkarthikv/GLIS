// Dashboard.js
import React from 'react';
import './css/dashboard.css'; // Import Dashboard CSS
import LargeSpace from './largespace';
import MapLinking from './maplinking';
import PieChart from './piechart';
import Widgets from './widgets';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="graph-container">
        <LargeSpace title="Highest Values" />
        <PieChart title="Pie Chart" />
        <MapLinking title="Map Linking" />
        <Widgets title="User Count Info" />
      </div>
    </div>
  );
};

export default Dashboard;
