import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animations/loading.json';
import { FaTrash } from 'react-icons/fa';
import './css/landview.css';

const Landview = () => {
    const [landData, setLandData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLandData();
    }, []);

    const fetchLandData = async () => {
        try {
            const response = await axios.get("https://glis-backend.onrender.com/api/agri/fetch");
            setLandData(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const response = await axios.delete(`https://glis-backend.onrender.com/api/agri/delete/${id}`);
            console.log(response.data);
            fetchLandData();
        } catch (error) {
            console.error("Error deleting land:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='LandView'>
            {loading ? (
                <div className="loading-animation">
                    <Lottie animationData={loadingAnimation} loop autoplay />
                </div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    <h1 className='landview-header'>Land Information</h1>
                    {landData.map((land, index) => (
                    <div key={index} className="land-info">
                    <div className="table-container">
                        <div className="left-table">
                            <h2 className='landview-table-header'>Land {index + 1}</h2>
                            <table className='landview-table'>
                                <tbody>
                                    <tr className='landview-table-row'>
                                        <td className='landview-table-data'>Owner's Name</td>
                                        <td className='landview-table-data'>{land.ownerName}</td>
                                    </tr>
                                    <tr className='landview-table-row'>
                                        <td className='landview-table-data'>Contact Person</td>
                                        <td className='landview-table-data'>{land.contact}</td>
                                    </tr>
                                    <tr className='landview-table-row'>
                                        <td className='landview-table-data'>Phone Number</td>
                                        <td className='landview-table-data'>{land.phoneNumber}</td>
                                    </tr>
                                    <tr className='landview-table-row'>
                                        <td className='landview-table-data'>Address</td>
                                        <td className='landview-table-data'>{land.address}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="right-table">
                            <h2 className='landview-table-header'>Land Details</h2>
                            <table>
                                <tbody>
                                    <tr className='landview-table-row'>
                                        <td className='landview-table-data'>Land Size</td>
                                        <td className='landview-table-data'>{land.landSize}</td>
                                    </tr>
                                    <tr className='landview-table-row'>
                                        <td className='landview-table-data'>Soil Type</td>
                                        <td className='landview-table-data'>{land.soilType}</td>
                                    </tr>
                                    <tr className='landview-table-row'>
                                        <td className='landview-table-data'>Crop Cultivated</td>
                                        <td className='landview-table-data'>{land.cropCultivated}</td>
                                    </tr>
                                    <tr className='landview-table-row'>
                                        <td className='landview-table-data'>Agricultural Loan (₹)</td>
                                        <td className='landview-table-data'>{land.agriculturalLoan}</td>
                                    </tr>
                                    <tr className='landview-table-row'>
                                        <td className='landview-table-data'>Latitude</td>
                                        <td className='landview-table-data'>{land.latitude}</td>
                                    </tr>
                                    <tr className='landview-table-row'>
                                        <td className='landview-table-data'>Longitude</td>
                                        <td className='landview-table-data'>{land.longitude}</td>
                                    </tr>
                                    <tr className='landview-table-row'>
                                        <td className='landview-table-data'>Price of Cultivated Crop:</td>
                                        <td className='landview-table-data'>{land.cropPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                    <div className="landview-trash-btn">
                                <button onClick={() => handleDelete(land._id)}><FaTrash/></button>
                    </div>
                </div>
                                   
                    ))}
                </div>
            )}
        </div>
    );
};

export default Landview;
