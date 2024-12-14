import React from 'react';
import LargeSpace from './stats';
// import Widgets from './widgets';
import Heatmap from './graphs/heatmap';
import Bar from'./graphs/barchart';
import PieChart from './graphs/piechart';
import Treemap from './graphs/treemap';
import Sample from './graphs/sample';

import './css/dashboard.css'; 
const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="graph-container">
        <LargeSpace title="Highest Values" className='graph-card' /> 
        {/* <Widgets title="Population density vs foot tracffic" className='graph-card' /> */}
        <Heatmap title="plot" className='graph-card' />
        <Bar title="Flood Risk Scores" className='graph-card'/>
        <PieChart title="plot" className='graph-card'/>
        <Treemap title="plot" className='graph-card'/>
        <Sample title="plot" className='graph-card'/>
      </div>
    </div>
  );
};

export default Dashboard;
