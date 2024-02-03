import React from 'react';
import './css/graphcard.css';

const GraphCard = ({ title }) => {
  return (
    <div className="graph-card">
      <h2>{title}</h2>
      {/* Add your graph content here */}
    </div>
  );
};

export default GraphCard;
