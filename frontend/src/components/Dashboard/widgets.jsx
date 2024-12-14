import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animations/loading.json';

const ScatterPlot = ({ title }) => {
  const [scatterData, setScatterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    xaxis: {
      title: {
        text: 'Standardized Foot Traffic'
      },
      labels: {
        formatter: function (val) {
          return val.toFixed(2); // Format x-axis labels to two decimal places
        }
      }
    },
    yaxis: {
      title: {
        text: 'Population Density'
      }
    },
    markers: {
      size: 6
    }
  };

  useEffect(() => {
    axios.get('https://glis-backend.onrender.com/api/bus-stations')
      .then(response => {
        const data = response.data;
        const maxFootTraffic = Math.max(...data.map(item => item.FootTraffic));
        const standardizedData = data.map(item => ({
          x: item.FootTraffic / maxFootTraffic, // Standardize x-axis values
          y: item.PopulationDensity,
          z: item.Rev // Assuming "Rev" is the bubble size
        }));
        setScatterData(standardizedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="chart-container">
      <h2>{title}</h2>
      {loading ? (
        <div className="loading-animation">
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <Chart options={options} series={[{ data: scatterData }]} type="scatter" height={400} />
      )}
    </div>
  );
};

export default ScatterPlot;
