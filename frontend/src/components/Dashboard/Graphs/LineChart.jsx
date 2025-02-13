import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/animations/loading.json'; // Import the loading animation

const LineChart = () => {

  const [chartData, setChartData] = useState({
    loading: true,
    error: null,
    data: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://glis-yqvt.onrender.com/api/bus-stations');

        setChartData({
          loading: false,
          error: null,
          data: response.data,
        });
      } catch (error) {
        setChartData({
          loading: false,
          error: 'Error fetching data. Please try again later.',
          data: [],
        });
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderChart = () => {
    const { data, loading, error } = chartData;

    if (loading) {
      return (
        <div className="loading-animation">
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
      );
    }

    if (error || !data || data.length === 0) {
      return <div className="error-message">{error || 'Error fetching data. Please try again later.'}</div>;
    }

    const seriesData = data.map(station => ({
      x: station.Rev,
      y: station.Size,
      name: station.Name
    }));

    const options = {
      chart: {
        type: 'scatter',
        zoom: {
          enabled: false,
        },
      },
      title: {
        text: 'Scatter Plot of Size vs Revenue',
        align: 'center'
      },
      xaxis: {
        title: {
          text: 'Revenue',
        },
      },
      yaxis: {
        title: {
          text: 'Size',
        },
      },
      tooltip: {
        enabled: true,
        intersect: false,
        align: 'left',
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const { x, y, name } = w.config.series[seriesIndex].data[dataPointIndex];
          return (
            '<div class="tooltip">' +
            '<span>Name: ' + name + '</span>' +
            '<br>' +
            '<span>Revenue: ' + x + '</span>' +
            '<br>' +
            '<span>Size: ' + y + '</span>' +
            '</div>'
          );
        },
      },
    };

    return <Chart options={options} series={[{ name: 'Data', data: seriesData }]} type="scatter" height={350} />;
  };

  return (
    <div className="dashboard-card">
      {renderChart()}
    </div>
  );
};

export default LineChart;
