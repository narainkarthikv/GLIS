import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './css/widgets.css'; // Import UserCountInfo CSS

const Widgets = () => {
  const zonesCountChartRef = useRef(null);
  const areaSizeChartRef = useRef(null);

  useEffect(() => {
    const data = {
      zonesCount: {
        commercial: 200,
        industrial: 150,
        residential: 100,
      },
      areaSize: {
        totalSize: [1000, 1500, 2000, 2500, 3000],
      },
    };

    const chartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    const zonesCountChart = new Chart(zonesCountChartRef.current, {
      type: 'pie',
      data: {
        labels: ['Commercial', 'Industrial', 'Residential'],
        datasets: [{
          label: 'Zones Count',
          data: [data.zonesCount.commercial, data.zonesCount.industrial, data.zonesCount.residential],
          backgroundColor: ['#03A9F4', '#FFC107', '#4CAF50'],
        }]
      },
      options: chartOptions
    });

    const areaSizeChart = new Chart(areaSizeChartRef.current, {
      type: 'line',
      data: {
        labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        datasets: [{
          label: 'Total Cumulative Area',
          data: data.areaSize.totalSize,
          borderColor: '#03A9F4',
          fill: false,
        }]
      },
      options: chartOptions
    });

    return () => {
      zonesCountChart.destroy();
      areaSizeChart.destroy();
    };
  }, []);

  return (
    <div className="user-count-info">
      <div className="grid-container">
        <div className="grid-item user-login">
          <div className="split stylish-split">
            <div className="left-section stylish-left-section">
              <h3>User Count</h3>
              <p>User Count: 150</p>
            </div>
            <div className="right-section stylish-right-section">
              <h3>Login Count</h3>
              <p>Login Count: 100</p>
            </div>
          </div>
        </div>
        <div className="grid-item land-data">
          <div className="split stylish-split">
            <div className="left-section stylish-left-section">
              <h3>Total Records</h3>
              <p>Total Records: 500</p>
            </div>
            <div className="right-section stylish-right-section">
              <h3>Login Count</h3>
              <p>Login Count: 100</p>
            </div>
          </div>
        </div>
        <div className="grid-item zones-count">
          <canvas ref={zonesCountChartRef} width="200" height="160"></canvas>
        </div>
        <div className="grid-item area-size">
          <canvas ref={areaSizeChartRef} width="200" height="160"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Widgets;
