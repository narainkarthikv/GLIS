import React from 'react';
import LargeSpace from './stats';
// import Widgets from './widgets';
import Heatmap from './Graphs/HeatMap';
import Bar from'./Graphs/BarChart';
import PieChart from './Graphs/PieChart';
import Treemap from './Graphs/TreeMap';
import Sample from './Graphs/sample';
import './css/Dashboard.css'; 

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
