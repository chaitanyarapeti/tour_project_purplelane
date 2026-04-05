import React from 'react'
import { useNavigate } from 'react-router-dom'
import siteImage from '../assets/siteImage'

const LandingPageTravelCard = ({ _id, name, destination, duration, price, description, images }) => {
  const navigate = useNavigate();
  
  const handleBookNow = () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/auth');
    } else {
      navigate(`/information/${_id}`);
    }
  };
  return (
    <div className='w-72 h-[450px] bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col'>
      {/* Image Section */}
      <div className='h-48 relative flex-shrink-0'>
        <img 
          className='w-full h-full object-cover'
          src={images[0] ? `http://localhost:5001${images[0]}` : siteImage.heroImage}
          alt={name}
        />
        {/* Price Tag */}
        <div className='absolute top-4 right-4 bg-orange-500 text-white px-4 py-1 rounded-full font-medium shadow-md'>
          ₹{price}
        </div>
      </div>

      {/* Content Section */}
      <div className='p-4 flex flex-col flex-grow'>
        {/* Location */}
        <div className='flex items-center gap-2 text-gray-600 mb-2'>
          <i className="ri-map-pin-line"></i>
          <span className='text-sm truncate'>{destination}</span>
        </div>

        {/* Title and Duration */}
        <div className='flex justify-between items-start gap-2 mb-3'>
          <h3 className='text-lg font-semibold text-gray-800 truncate flex-grow'>{name}</h3>
          <span className='text-sm bg-orange-50 text-orange-600 px-2 py-1 rounded-full flex-shrink-0 whitespace-nowrap'>
            {duration}
          </span>
        </div>

        {/* Description */}
        <div className='flex-grow'>
          <p className='text-gray-600 text-sm line-clamp-3 mb-4'>
            {description}
          </p>
        </div>

        {/* Book Now Button */}
        <button 
          onClick={handleBookNow}
          className='w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors mt-auto'
        >
          Show Package
        </button>
      </div>
    </div>
  )
}

export default LandingPageTravelCard
