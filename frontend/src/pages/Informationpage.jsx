import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Informationpage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tourPackage, setTourPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  
  // Function to handle tab changes
  const handleTabChange = (tabIndex) => {
    console.log('Changing to tab:', tabIndex);
    setActiveTab(tabIndex);
    // Reset any error states if they exist
    if (error) setError(null);
  };

  useEffect(() => {
    const fetchTourPackage = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/package/displayPackages/${id}`);
        console.log('Tour Package Response:', response.data);
        
        // If itinerary doesn't exist, create a sample one (remove this in production)
        if (!response.data.itinerary) {
          response.data.itinerary = [
            {
              day: 1,
              title: "Arrival and Welcome",
              activities: ["Airport pickup", "Hotel check-in", "Welcome dinner"]
            },
            {
              day: 2,
              title: "City Exploration",
              activities: ["Morning city tour", "Local market visit", "Evening cultural show"]
            }
          ];
        }
        
        setTourPackage(response.data);
        console.log('Itinerary:', response.data.itinerary);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tour package:', err);
        setError(err.response?.data?.message || "Failed to fetch tour package");
        setLoading(false);
      }
    };

    fetchTourPackage();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!tourPackage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">Package not found</div>
      </div>
    );
  }


  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <div 
        className="relative h-[350px] bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('${tourPackage.images?.[0] ? `http://localhost:5001${tourPackage.images[0]}` : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'}')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        <nav className="relative z-10 flex items-center justify-between px-16 py-6">
          <div className="text-white text-2xl font-bold tracking-widest">Travel</div>
          <ul className="flex gap-8 text-white text-lg">
            <li onClick={() => navigate('/date')} className="hover:text-orange-400 cursor-pointer">Home</li>
            <li onClick={() => navigate('/date')} className="hover:text-orange-400 cursor-pointer">Packages</li>
            <li className="hover:text-orange-400 cursor-pointer">Contact</li>
          </ul>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow">
            Get in Touch
          </button>
        </nav>
        <div className="relative z-10 flex flex-col items-center justify-center h-full pt-10">
          <h1 className="text-4xl font-bold text-white mb-4">{tourPackage.name}</h1>
          <p className="text-xl text-white opacity-90">{tourPackage.destination}</p>
          <div className="mt-4 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full">
            <span className="text-white font-semibold">₹{tourPackage.price}</span>
            <span className="text-white/80 mx-2">•</span>
            <span className="text-white">{tourPackage.duration}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-4">
            <button 
              onClick={() => handleTabChange(0)}
              className={`px-6 py-3 font-semibold rounded-t-lg ${
                activeTab === 0 
                  ? 'text-orange-500 border-b-4 border-orange-500 bg-white' 
                  : 'text-gray-600 hover:text-orange-500 hover:bg-gray-50'
              }`}
            >
              Information
            </button>
            <button 
              onClick={() => handleTabChange(1)}
              className={`px-6 py-3 font-semibold rounded-t-lg cursor-pointer ${
                activeTab === 1 
                  ? 'text-orange-500 border-b-4 border-orange-500 bg-white' 
                  : 'text-gray-600 hover:text-orange-500 hover:bg-gray-50'
              }`}
            >
              Tour Plan
            </button>
          </div>
        </div>

        {/* Tab Content */}

        {/* Tab Content */}
        {activeTab === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Details Section */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-600">{tourPackage.description}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Tour Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <i className="ri-map-pin-line text-orange-500"></i>
                    <span className="text-gray-600">Destination: {tourPackage.destination}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-time-line text-orange-500"></i>
                    <span className="text-gray-600">Duration: {tourPackage.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-group-line text-orange-500"></i>
                    <span className="text-gray-600">Group Size: {tourPackage.maxGroupSize} people</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-check-line text-orange-500"></i>
                    <span className="text-gray-600">Available: {tourPackage.availability ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              {tourPackage.images?.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-3">Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tourPackage.images.map((img, i) => (
                      <img 
                        key={i} 
                        src={`http://localhost:5001${img}`} 
                        alt={`Tour ${i + 1}`} 
                        className="w-full h-48 object-cover rounded-lg shadow-md" 
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Admin Actions Section */}
            <div className="bg-white p-6 rounded-lg shadow-md h-fit">
              <h3 className="text-xl font-semibold mb-4">Package Actions</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Price per person</span>
                  <span className="text-2xl font-bold text-orange-500">₹{tourPackage.price}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => navigate(`/update/${id}`)}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Update Tour
                  </button>
                  <button 
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to delete this tour package?')) {
                        try {
                          await axios.delete(`http://localhost:5001/api/package/remove/${id}`);
                          navigate('/date'); // Navigate to date page after deletion
                        } catch {
                          setError('Failed to delete tour package');
                        }
                      }
                    }}
                    className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-8">
            <h2 className="text-2xl font-semibold mb-8 text-center">Tour Itinerary</h2>
            <div className="max-w-4xl mx-auto">
              {console.log('Rendering Tour Plan, itinerary:', tourPackage.itinerary)}
              {tourPackage.itinerary && tourPackage.itinerary.length > 0 ? (
                tourPackage.itinerary.map((day, index) => (
                  <div key={index} className="relative">
                    {/* Vertical connecting line */}
                    {index < tourPackage.itinerary.length - 1 && (
                      <div className="absolute left-[2.5rem] top-20 h-24 w-1 bg-gradient-to-b from-orange-500 to-orange-300"></div>
                    )}
                    
                    <div className="flex items-start gap-6 mb-8">
                      {/* Day circle */}
                      <div className="flex-shrink-0 w-20 h-20 rounded-full bg-orange-500 text-white flex flex-col items-center justify-center shadow-lg">
                        <span className="text-sm font-medium">Day</span>
                        <span className="text-2xl font-bold">{day.day || index + 1}</span>
                      </div>
                      
                      {/* Content card */}
                      <div className="flex-grow">
                        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500 relative">
                          {/* Arrow pointing to the circle */}
                          <div className="absolute left-[-0.75rem] top-6 w-3 h-3 transform rotate-45 bg-orange-500"></div>
                          
                          <h3 className="text-xl font-semibold text-orange-600 mb-4">{day.title || `Day ${index + 1} Activities`}</h3>
                          <div className="space-y-3">
                            {day.activities && day.activities.length > 0 ? (
                              day.activities.map((activity, actIndex) => (
                                <div key={actIndex} className="flex items-start gap-3 bg-orange-50 p-3 rounded-lg">
                                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-orange-400"></div>
                                  <p className="text-gray-700">{activity}</p>
                                </div>
                              ))
                            ) : (
                              <div className="text-gray-500 italic">No activities planned for this day</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  <p className="text-xl mb-2">No itinerary available</p>
                  <p>The tour itinerary has not been added yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Informationpage;7