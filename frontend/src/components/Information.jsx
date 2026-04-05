import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Information = () => {
    const [tourPackage, setTourPackage] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/package/displayPackages/${id}`);
                setTourPackage(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching package details:', error);
                setLoading(false);
            }
        };

        fetchPackageDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!tourPackage) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600">Package not found</h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Image Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                        {tourPackage.images && tourPackage.images.map((image, index) => (
                            <img
                                key={index}
                                src={`http://localhost:5001${image}`}
                                alt={`Tour view ${index + 1}`}
                                className="w-full h-64 object-cover rounded"
                            />
                        ))}
                    </div>

                    {/* Package Details */}
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{tourPackage.name}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-lg text-gray-600 mb-4">{tourPackage.description}</p>
                                <div className="space-y-2">
                                    <p className="text-gray-700"><span className="font-semibold">Destination:</span> {tourPackage.destination}</p>
                                    <p className="text-gray-700"><span className="font-semibold">Duration:</span> {tourPackage.duration}</p>
                                    <p className="text-gray-700"><span className="font-semibold">Price:</span> ₹{tourPackage.price}</p>
                                    <p className="text-gray-700"><span className="font-semibold">Group Size:</span> Up to {tourPackage.maxGroupSize} people</p>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold mb-2">Tags:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {tourPackage.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Itinerary */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Itinerary</h3>
                                <div className="space-y-4">
                                    {tourPackage.itinerary.map((day, index) => (
                                        <div key={index} className="border-l-2 border-blue-500 pl-4">
                                            <h4 className="font-semibold text-lg">Day {day.day}: {day.title}</h4>
                                            <ul className="list-disc list-inside ml-4 text-gray-600">
                                                {day.activities.map((activity, actIndex) => (
                                                    <li key={actIndex}>{activity}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Book Now Button */}
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => navigate(`/booking/${tourPackage._id}`)}
                                className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Information;
