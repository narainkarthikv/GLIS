import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import Lottie from "lottie-react";

const PieChart = () => {
  const [sizeData, setSizeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://glis-backend.onrender.com/api/bus-stations');
        const processedData = response.data.map(item => ({
          label: item.Name,
          value: item.Size
        }));
        setSizeData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: 'pie',
    },
    labels: sizeData.map(item => item.label),
    dataLabels: {
      enabled: false,
    }
  };

  const series = sizeData.map(item => item.value);

  return (
    <div className="dashboard-card">
      <h2 className='graph-card-header'>Pie Chart: Size Distribution in Acres</h2>
      {loading ? (
        <div className="loading-animation">
          <Lottie animationData={require('../../../assets/animations/loading.json')} loop autoplay />
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <Chart options={options} series={series} type="pie" height={350} />
      )}
    </div>
  );
};

export default PieChart;
