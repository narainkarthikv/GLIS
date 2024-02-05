// LargeSpace.js
import React, { useState } from 'react';
import Slider from 'react-slick';
import './css/largespace.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const data = [
  { title: 'Cuddalore', year: 1980, revenue: 5000, riskscore: 7, floodEvents: 2, elevation: 100 },
  { title: 'Chennai', year: 1990, revenue: 200, riskscore: 9, floodEvents: 5, elevation: 50 },
  { title: 'Erode',  year: 2010, revenue: 20000, riskscore: 5, floodEvents: 1, elevation: 200 },
  { title: 'Karur', year: 2000, revenue: 7000, riskscore: 8, floodEvents: 3, elevation: 150 },
  { title: 'Coimbatore', year: 2001, revenue: 8000, riskscore: 1, floodEvents: 9, elevation: 100 },
  
];

const LargeSpace = () => {
  const [currentCategory, setCurrentCategory] = useState('riskscore');

  const sliderSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (oldIndex, newIndex) => {
      switch (newIndex) {
        case 0:
          setCurrentCategory('riskscore');
          break;
        case 1:
          setCurrentCategory('floodEvents');
          break;
        case 2:
          setCurrentCategory('revenue');
          break;
        default:
          break;
      }
    },
  };

  // Function to get the top 5 areas based on specific criteria for each category
  const getTop5Areas = (category) => {
    switch (category) {
      case 'riskscore':
        return data
          .sort((a, b) => b.riskscore - a.riskscore)
          .slice(0, 5)
          .map((area, index) => (
            <tr key={index}>
              <td>{area.title}</td>
              <td>{area.riskscore}</td>
            </tr>
          ));

      case 'floodEvents':
        return data
          .sort((a, b) => b.floodEvents - a.floodEvents)
          .slice(0, 5)
          .map((area, index) => (
            <tr key={index}>
              <td>{area.title}</td>
              <td>{area.floodEvents}</td>
            </tr>
          ));

      case 'revenue':
        return data
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5)
          .map((area, index) => (
            <tr key={index}>
              <td>{area.title}</td>
              <td>{area.revenue}</td>
            </tr>
          ));

      default:
        return [];
    }
  };

  return (
    <div className="large-space">
      <Slider {...sliderSettings}>
        <div className="slide-content risk-slide">
          <h2>Risk of Area</h2>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Risk Score (Out of 10)</th>
              </tr>
              {getTop5Areas('riskscore')}
            </tbody>
          </table>
        </div>

        <div className="slide-content flood-slide">
          <h2>Flood Events</h2>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Flood Events Occurred</th>
              </tr>
              {getTop5Areas('floodEvents')}
            </tbody>
          </table>
        </div>

        <div className="slide-content revenue-slide">
          <h2>Revenue</h2>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Revenue Generated</th>
              </tr>
              {getTop5Areas('revenue')}
            </tbody>
          </table>
        </div>
      </Slider>
    </div>
  );
};

export default LargeSpace;
