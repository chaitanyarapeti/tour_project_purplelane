import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Button,TextField,Select} from '@mui/material'
import siteImage from '../assets/siteImage'
import LandingPageTravelCard from '../reusable_components/LandingPageTravelCard';

const Landingpage = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [cardWidth] = React.useState(280); // Approximate width of card + gap
  const [visibleCards] = React.useState(3); // Number of cards visible at once
  const [packages, setPackages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/package/displayPackages');
        if (response.data) {
          setPackages(Array.isArray(response.data) ? response.data : []);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching packages:', err);
        setError(err.response?.data?.message || 'Failed to load packages');
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const scroll = (direction) => {
    const scrollAmount = cardWidth * visibleCards;
    const newPosition = direction === 'left'
      ? Math.max(0, scrollPosition - scrollAmount)
      : scrollPosition + scrollAmount;
    
    setScrollPosition(newPosition);
  };

  // Calculate if we should disable buttons
  const isAtStart = scrollPosition === 0;
  const totalCards = 7; // Total number of cards
  const isAtEnd = scrollPosition >= (totalCards - visibleCards) * cardWidth;

  return (
    // Hero page
    <section id='header' className='w-full min-h-screen overflow-x-hidden px-20'>
        {/* Navbar */}
      <nav className='w-full h-20 bg-gray-100 rounded-b-2xl flex justify-between px-4'>
        <div className='h-full flex items-center  gap-5 flex-1/4'>
            <span className='flex w-15 h-15 rounded-2xl'>
              <img src={siteImage.birdIcon} alt="" />
            </span>
            <span className='text-2xl font-medium'>Just Trip</span>
        </div>
        <div className='flex-1/4 flex items-center h-full justify-end'>
            <Button 
              variant="contained" 
              disableElevation
              onClick={() => {
                const token = localStorage.getItem('userToken');
                if (!token) {
                  navigate('/auth');
                } else {
                  navigate('/date');
                }
              }}
            >
              Book Now
            </Button>
        </div>
      </nav>
      <div className='w-full bg-gray-200 rounded-4xl h-130 relative'>
        <div className='w-full h-full rounded-2xl'>
          <img className='object-cover w-full h-full object-top rounded-4xl' src={siteImage.heroImage} alt="" />
        </div>
        {/* dataes and input */}
        <div className='w-full flex h-30 absolute px-5 bg-gray-50 border border-gray-200 -bottom-15 shadow-lg rounded-2xl'>
            <div className='w-200 h-full items-center flex'>
                <TextField
                className='w-full'
                id="outlined-multiline-flexible"
                label="Find here.."
                multiline
                />
            </div>
            {/* Dates */}
            <div className='w-full h-full justify-around flex'>
                <div className='h-full flex-col items-center justify-center flex'>
                    <label className='text-gray-400 text-sm' htmlFor="">Depature</label>
                    <select name="" id="">
                      <option value="">option-1</option>
                      <option value="">option-2</option>
                      <option value="">option-3</option>
                      <option value="">option-4</option>
                      <option value="">option-5</option>
                    </select>
                </div>
                <div className='h-full flex-col items-center justify-center flex'>
                    <label className='text-gray-400 text-sm' htmlFor="">Return</label>
                    <select name="" id="">
                      <option value="">option-1</option>
                      <option value="">option-2</option>
                      <option value="">option-3</option>
                      <option value="">option-4</option>
                      <option value="">option-5</option>
                    </select>
                </div>
                <div className='h-full flex-col items-center justify-center flex'>
                    <label className='text-gray-400 text-sm' htmlFor="">Cabin class & Travelers</label>
                    <select name="" id="">
                      <option value="">option-1</option>
                      <option value="">option-2</option>
                      <option value="">option-3</option>
                      <option value="">option-4</option>
                      <option value="">option-5</option>
                    </select>
                </div>
                <div className='h-full flex-col items-center justify-center flex'>
                    <label className='text-gray-400 text-sm' htmlFor="">Search</label>
                    <select className='' name="" id="">
                      <option value="">option-1</option>
                      <option value="">option-2</option>
                      <option value="">option-3</option>
                      <option value="">option-4</option>
                      <option value="">option-5</option>
                    </select>
                </div>
            </div>
        </div>
      </div>

      {/* section-2 upcoming events */}

      <section className='w-full h-full mt-15 pt-10'>
        <div className='flex justify-between items-center relative'>
          <h1 className='text-3xl font-medium w-50'>Upcoming Events
            <div className='w-30 h-10 bg-yellow-300 absolute -bottom-6 z-[-1]'>

            </div>
          </h1>
          <p className='text-gray-500 w-70'>Some of the popular destinations to visit to create a beautiful memeories</p>
          <div className='flex gap-2'>
            <button 
              onClick={() => scroll('left')}
              disabled={isAtStart}
              className={`w-10 cursor-pointer border border-gray-300 flex h-10 items-center justify-center rounded-full bg-gray-50 shadow-lg hover:bg-gray-100 active:shadow-inner transition-all ${isAtStart ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <i className="ri-arrow-left-long-fill"></i>
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={isAtEnd}
              className={`w-10 cursor-pointer flex h-10 items-center border border-gray-300 bg-gray-50 justify-center rounded-full shadow-lg hover:bg-gray-100 active:shadow-inner transition-all ${isAtEnd ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <i className="ri-arrow-right-long-fill"></i>
            </button>
          </div>
        </div>

        {/* booking cards */}

        <div 
          style={{
            transform: `translateX(-${scrollPosition}px)`,
            transition: 'transform 0.5s ease-in-out'
          }}
          className='w-full flex gap-4 h-110 mt-7 p-4'>
          <div className='flex gap-4 min-w-min'>
            {loading ? (
              // Loading state
              <div className='w-full flex justify-center items-center py-8'>
                <p className='text-gray-500'>Loading packages...</p>
              </div>
            ) : error ? (
              // Error state
              <div className='w-full flex justify-center items-center py-8'>
                <p className='text-red-500'>{error}</p>
              </div>
            ) : packages.length === 0 ? (
              // Empty state
              <div className='w-full flex justify-center items-center py-8'>
                <p className='text-gray-500'>No packages available</p>
              </div>
            ) : (
              // Render packages
              packages.map((pkg) => (
                <div onClick={() => navigate('/auth')}>
                  <LandingPageTravelCard
                    key={pkg._id}
                    name={pkg.name}
                    destination={pkg.destination}
                    duration={pkg.duration?.split(' ')[0] || '0'} // Extract number from duration string
                    price={pkg.price}
                    description={pkg.description}
                    images={pkg.images}
                    available={pkg.availability}
                    maxGroupSize={pkg.maxGroupSize}
                    tags={pkg.tags}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Top Domains to visit */}
        <section className='w-full mt-4'>
          <div className='flex justify-between items-center relative'>
          <h1 className='text-3xl font-medium w-50'>Top Destinations
            <div className='w-30 h-10 bg-yellow-300 absolute -bottom-6 z-[-1]'>

            </div>
          </h1>
          <p className='text-gray-500 w-70'>Some of the popular destinations to visit to create a beautiful memeories</p>
          <div className='flex gap-2'>
            <span className='w-10 cursor-pointer border border-gray-300 flex h-10 items-center justify-center rounded-full bg-gray-50 shadow-lg'><i class="ri-arrow-left-long-fill"></i></span>
            <span className='w-10 cursor-pointer flex h-10 items-center border border-gray-300 bg-gray-50 justify-center rounded-full shadow-lg'><i className="ri-arrow-right-long-fill"></i></span>
          </div>
        </div>

        <div className='w-full h-100 bg-gray-100 mt-9 flex gap-4 p-4 mb-5'>
          <div className='h-full relative flex-1 group transition-all duration-500 hover:flex-[2.5] overflow-hidden'>
            <img className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' src={siteImage.ocean1} alt="" />
            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0'>
              <h3 className='text-white text-xl font-semibold mb-2'>Ocean Paradise</h3>
              <p className='text-white/90 text-sm mb-3'>Experience the stunning beaches and crystal-clear waters</p>
              <div className='flex items-center text-white/90 gap-2 text-sm'>
                <i className="ri-map-pin-line"></i>
                <span>Goa, India</span>
              </div>
            </div>
          </div>
          <div className='h-full relative flex-1 group transition-all duration-500 hover:flex-[2.5] overflow-hidden'>
            <img className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' src={siteImage.heroImage} alt="" />
            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0'>
              <h3 className='text-white text-xl font-semibold mb-2'>Mountain Escape</h3>
              <p className='text-white/90 text-sm mb-3'>Discover the beauty of mountain landscapes</p>
              <div className='flex items-center text-white/90 gap-2 text-sm'>
                <i className="ri-map-pin-line"></i>
                <span>Himachal Pradesh, India</span>
              </div>
            </div>
          </div>
          <div className='h-full relative flex-1 group transition-all duration-500 hover:flex-[2.5] overflow-hidden'>
            <img className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' src={siteImage.tajMahal} alt="" />
            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0'>
              <h3 className='text-white text-xl font-semibold mb-2'>Taj Mahal</h3>
              <p className='text-white/90 text-sm mb-3'>Visit the iconic symbol of eternal love</p>
              <div className='flex items-center text-white/90 gap-2 text-sm'>
                <i className="ri-map-pin-line"></i>
                <span>Agra, India</span>
              </div>
            </div>
          </div>
          <div className='h-full relative flex-1 group transition-all duration-500 hover:flex-[2.5] overflow-hidden'>
            <img className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' src={siteImage.kerela} alt="" />
            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0'>
              <h3 className='text-white text-xl font-semibold mb-2'>Kerala Backwaters</h3>
              <p className='text-white/90 text-sm mb-3'>Experience the serene backwaters and houseboats</p>
              <div className='flex items-center text-white/90 gap-2 text-sm'>
                <i className="ri-map-pin-line"></i>
                <span>Kerala, India</span>
              </div>
            </div>
          </div>
          <div className='h-full relative flex-1 group transition-all duration-500 hover:flex-[2.5] overflow-hidden'>
            <img className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' src={siteImage.goldenTemple} alt="" />
            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0'>
              <h3 className='text-white text-xl font-semibold mb-2'>Golden Temple</h3>
              <p className='text-white/90 text-sm mb-3'>Visit the spiritual heart of Sikhism</p>
              <div className='flex items-center text-white/90 gap-2 text-sm'>
                <i className="ri-map-pin-line"></i>
                <span>Amritsar, India</span>
              </div>
            </div>
          </div>
          <div className='h-full relative flex-1 group transition-all duration-500 hover:flex-[2.5] overflow-hidden'>
            <img className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' src={siteImage.kashmirHills} alt="" />
            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0'>
              <h3 className='text-white text-xl font-semibold mb-2'>Kashmir Valley</h3>
              <p className='text-white/90 text-sm mb-3'>Experience the paradise on Earth</p>
              <div className='flex items-center text-white/90 gap-2 text-sm'>
                <i className="ri-map-pin-line"></i>
                <span>Kashmir, India</span>
              </div>
            </div>
          </div>
          <div className='h-full relative flex-1 group transition-all duration-300 hover:flex-[1.5] overflow-hidden'>
            <img className='w-full h-full object-cover' src={siteImage.goa} alt="" />
          </div>
        </div>
        </section>
      </section>
      {/* Our Gallery Section */}
      <section className='w-full min-h-screen bg-white py-20'>
        <div className='max-w-[1400px] mx-auto px-8'>
          {/* Section Title */}
          <div className='relative inline-block mb-16'>
            <h2 className='text-4xl font-semibold'>Our Gallery</h2>
            <div className='absolute -bottom-3 left-0 w-32 h-4 bg-yellow-300 -z-10'></div>
          </div>

          {/* Gallery Grid */}
          <div className='grid grid-cols-4 gap-4 auto-rows-[300px]'>
            {/* First Row */}
            <div className='col-span-1 row-span-1'>
              <img src={siteImage.mahal} alt="Modern Building" 
                className='w-full h-full object-cover rounded-xl' />
            </div>
            <div className='col-span-1 row-span-1'>
              <img src={siteImage.lotusTemple} alt="Temple" 
                className='w-full h-full object-cover rounded-xl' />
            </div>
            <div className='col-span-1 row-span-1'>
              <img src={siteImage.tajmahal2} alt="Palm Trees" 
                className='w-full h-full object-cover rounded-xl' />
            </div>
            <div className='col-span-1 row-span-2'>
              <img src={siteImage.mumbai} alt="Tourist Bus" 
                className='w-full h-full object-cover rounded-xl' />
            </div>

            {/* Second Row */}
            <div className='col-span-2 row-span-2'>
              <img src={siteImage.tajMahal} alt="Japanese Temple" 
                className='w-full h-full object-cover rounded-xl' />
            </div>
            <div className='col-span-1 row-span-1'>
              <img src={siteImage.rajastan} alt="Beaver" 
                className='w-full h-full object-cover rounded-xl' />
            </div>

            {/* Third Row */}
            <div className='col-span-1 row-span-1'>
              <img src={siteImage.kashmirHills} alt="Eiffel Tower" 
                className='w-full h-full object-cover rounded-xl' />
            </div>
            <div className='col-span-1 row-span-1'>
              <img src={siteImage.goa} alt="Coastal Town" 
                className='w-full h-full object-cover rounded-xl' />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className='w-full h-screen'>
        <div className='w-full h-140 bg-gray-100 rounded-4xl relative'>
          <img className='h-full w-full object-cover rounded-4xl' src={siteImage.hill} alt="" />
          <div className='absolute w-full h-full top-1/4 -translate-y-1/2 left-1/2 flex items-center justify-center flex-col gap-20 -translate-x-1/2'>
          <div className='w-full text-center mt-60'>
            <h1 className='text-5xl font-medium text-clip text-center text-shadow-[0px_0px_0px] text-shadow-white/60 text-transparent'>TRAVEL</h1>
            <h1 className='text-9xl font-bold text-white/90'>WITH US</h1>
          </div>

            <div className='w-full flex mt-40 items-center gap-10 justify-center'>
              <span>
                <i className="ri-map-pin-user-fill text-5xl text-white"></i>
                <h1 className='font-medium text-white'>Search</h1>
              </span>
              <span>
              <i className="ri-bookmark-3-line text-5xl text-white"></i>
                <h1 className='font-medium text-white text-center'>Book</h1>
              </span>
              <span>
              <i className="ri-suitcase-2-line text-5xl text-white"></i>
                <h1 className='font-medium text-white text-center'>Travel</h1>
              </span>
            </div>
          </div>
        </div>

        {/* singup */}
        <div className='w-full h-30 bg-gray-50 mt-10 flex items-center justify-center gap-3 flex-col'>
          <h1 className='text-4xl font-medium text-center py-2'>Singup to our Newsletter</h1>
          <div>
            <input placeholder='Your email here...' className='border indent-4 outline-0 focus:ring-2 ring-blue-400 focus:border-2 focus:border-blue-300 transition-all rounded-l-2xl h-14 border-gray-300 w-140 bg-white' type="email" />
            <button className='w-40 h-14 cursor-pointer bg-black rounded-r-2xl text-white font-medium'>Sign Up</button>
          </div>
        </div>

        {/* last page */}
        <section className='w-full flex flex-col h-110 text-white bg-black/90 mt-10'>
          <div className='w-full h-full p-10 flex justify-between items-center'>
            <ul className='flex flex-col gap-5'>
              <li className='text-3xl font-medium pb-5'>Just Trip</li>
              <li>+9139390303</li>
              <li>Sagar@gmail.com</li>
              <li>Tadepalligudem, AP</li>
              <li className='text-2xl flex gap-5'>
                <i className="ri-facebook-fill"></i>
                <i className="ri-instagram-line"></i>
                <i className="ri-twitter-line"></i>
              </li>
            </ul>
            <div className='flex gap-20'>
              <ul className='flex flex-col gap-5'>
                <li className='text-xl pb-5 font-medium'>Useful Link</li>
                <li>Upcoming Events</li>
                <li>Booking a Ticket</li>
                <li>Travel With Us</li>
                <li>Our Gallary</li>
                <li>Write Reivew</li>
              </ul>
              <ul className='flex flex-col gap-5'>
                <li className='text-xl pb-5 font-medium'>Useful Link</li>
                <li>Upcoming Events</li>
                <li>Booking a Ticket</li>
                <li>Travel With Us</li>
                <li>Our Gallary</li>
                <li>Write Reivew</li>
              </ul>
              <ul className='flex flex-col gap-5'>
                <li className='text-xl pb-5 font-medium'>Useful Link</li>
                <li>Upcoming Events</li>
                <li>Booking a Ticket</li>
                <li>Our Gallary</li>
              </ul>
            </div>
          </div>
          <div className='w-full px-10 py-2 flex items-center justify-between'>
            <p>Website is in Copyright</p>
            <a href='#header' className='flex h-18 w-14 bg-white/85 rounded-lg items-center justify-baseline'>
              <i className="ri-arrow-up-long-line text-black text-center w-full cursor-pointer font-medium text-2xl"></i>
            </a>
          </div>
        </section>
      </section>

    </section>
  )
}

export default Landingpage
