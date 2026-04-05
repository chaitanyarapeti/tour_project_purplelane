
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import LandingPageTravelCard from "../reusable_components/LandingPageTravelCard";
import siteImage from '../assets/siteImage';

const Datepage = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState('default');

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      console.log('Fetching packages...');
      const response = await axios.get('http://localhost:5001/api/package/displayPackages');
      console.log('Response:', response);
      if (response.data) {
        const packageData = Array.isArray(response.data) ? response.data : 
                          response.data.packages ? response.data.packages : [];
        console.log('Processed package data:', packageData);
        setPackages(packageData);
        setLoading(false);
      } else {
        console.log('No data in response');
        setError('No data received from server');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching packages:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load packages');
      setLoading(false);
    }
  };

  const handleSort = (type) => {
    setSortType(type);
    let sortedPackages = [...packages];
    
    switch (type) {
      case 'price-low':
        sortedPackages.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-high':
        sortedPackages.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'name':
        sortedPackages.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order
        break;
    }
    
    setPackages(sortedPackages);
  };
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${siteImage.heroImage})` }}>
        <div className="absolute inset-0 bg-opacity-40"></div>
        <nav className="relative z-10 flex items-center justify-end px-16 py-6">
          <button 
            onClick={() => navigate('/admin')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow transition-colors flex items-center gap-2">
            <i className="ri-add-line"></i>
            Create New Package
          </button>
        </nav>
        <div className="relative z-10 flex flex-col items-center mt-10 h-full pt-10">
          <h2 className="text-white text-3xl tracking-widest mb-2">Available Packages</h2>
          <h1 className="text-white text-6xl md:text-6xl font-bold mb-4 drop-shadow-lg">Travel With Us</h1>
        </div>
      </div>

      {/* Tour Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-24 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Sort Options */}
          <div className="flex gap-2 md:gap-6 mb-8 border-b pb-4 overflow-x-auto">
            <button 
              onClick={() => handleSort('default')}
              className={`px-6 py-2 rounded-t-lg font-semibold transition-colors ${
                sortType === 'default' 
                ? 'text-orange-500 border-b-4 border-orange-500 bg-orange-50' 
                : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
              }`}>
              All Packages
            </button>
            <button 
              onClick={() => handleSort('price-low')}
              className={`px-6 py-2 rounded-t-lg font-semibold transition-colors ${
                sortType === 'price-low' 
                ? 'text-orange-500 border-b-4 border-orange-500 bg-orange-50' 
                : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
              }`}>
              Price Low To High
            </button>
            <button 
              onClick={() => handleSort('price-high')}
              className={`px-6 py-2 rounded-t-lg font-semibold transition-colors ${
                sortType === 'price-high' 
                ? 'text-orange-500 border-b-4 border-orange-500 bg-orange-50' 
                : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
              }`}>
              Price High To Low
            </button>
            <button 
              onClick={() => handleSort('name')}
              className={`px-6 py-2 rounded-t-lg font-semibold transition-colors ${
                sortType === 'name' 
                ? 'text-orange-500 border-b-4 border-orange-500 bg-orange-50' 
                : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
              }`}>
              Name (A-Z)
            </button>
          </div>

          {/* Tour Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {loading ? (
              // Loading state
              <div className="col-span-full flex justify-center items-center py-8">
                <p className="text-gray-500">Loading packages...</p>
              </div>
            ) : error ? (
              // Error state
              <div className="col-span-full flex justify-center items-center py-8">
                <p className="text-red-500">{error}</p>
              </div>
            ) : packages.length === 0 ? (
              // Empty state
              <div className="col-span-full flex justify-center items-center py-8">
                <p className="text-gray-500">No packages available</p>
              </div>
            ) : (
              // Render packages
              packages.map((pkg) => (
                <LandingPageTravelCard
                  key={pkg._id}
                  _id={pkg._id}
                  name={pkg.name}
                  destination={pkg.destination}
                  duration={pkg.duration}
                  price={pkg.price}
                  description={pkg.description}
                  images={pkg.images}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Datepage;
