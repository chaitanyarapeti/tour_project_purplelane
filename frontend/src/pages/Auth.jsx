import React, { useState } from 'react'
import { TextField, Checkbox, FormControlLabel } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'traveler',
    profileImage: 'https://picsum.photos/200/300',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      pincode: ''
    }
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate passwords match for registration
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      // Validate required fields for registration
      if (!isLogin) {
        const { name, email, password, address } = formData;
        if (name === "" || !email || !password || 
            !address.street || !address.city || !address.state || 
            !address.country || !address.pincode) {
          setError('Please fill in all required fields');
          setLoading(false);
          return;
        }
      }

      let response;
      if (isLogin) {
        // Login
        response = await axios.post('http://localhost:5001/api/users/signin', {
          email: formData.email,
          password: formData.password
        });
      } else {
        // Register - exact match with backend format
        const registrationData = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          role: 'traveler',
          profileImage: formData.profileImage,
          address: {
            street: formData.address.street.trim(),
            city: formData.address.city.trim(),
            state: formData.address.state.trim(),
            country: formData.address.country.trim(),
            pincode: formData.address.pincode.trim()
          }
        };
        
        console.log('Registration Data:', registrationData); // For debugging
        response = await axios.post('http://localhost:5001/api/users/register', registrationData);
      }

      if (isLogin) {
        if (response.data.token) {
          localStorage.setItem('userToken', response.data.token);
          if (rememberMe) {
            localStorage.setItem('rememberedEmail', formData.email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
          // Store user info
          localStorage.setItem('userInfo', JSON.stringify(response.data.isExist));
          // Redirect to date page
          navigate('/date');
        }
      } else {
        // Handle registration success
        if (response.data) {
          // Show success message
          setError('');
          alert('Registration successful! Please login.');
          
          // Reset form
          setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            role: 'user',
            profileImage: '',
            address: {
              street: '',
              city: '',
              state: '',
              country: '',
              pincode: ''
            }
          });
          
          // Switch to login view
          setIsLogin(true);
        }
      }
    } catch (err) {
      console.error('Registration Error:', err.response?.data); // For debugging
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      if (errorMessage.includes('Insufficient user credentials')) {
        setError('Please fill in all required fields');
      } else if (errorMessage.includes('User not exist')) {
        setError('User not found. Please check your email.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex'>
      {/* Left Side - Form */}
      <div className='flex-1 flex items-center justify-center p-8'>
        <div className='w-full max-w-md space-y-8'>
          {/* Title and Description */}
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-gray-900'>
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              Start planning your dream vacation - explore amazing destinations and create unforgettable memories!
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            {!isLogin && (
              <div className='mb-3'>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required={!isLogin}
                  sx={{ marginBottom: 1 }}
                />
              </div>
            )}

            <div className='mb-6'>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                sx={{ marginBottom: 3 }}
              />
            </div>

            {!isLogin && (
              <>
                <div className='mb-3'>
                  <TextField
                    fullWidth
                    label="Profile Image URL"
                    variant="outlined"
                    type="url"
                    name="profileImage"
                    value={formData.profileImage}
                    onChange={handleChange}
                    placeholder="Enter your profile image URL"
                    required={!isLogin}
                    sx={{ marginBottom: 1 }}
                  />
                </div>

                {/* Address Fields */}
                <div className="space-y-3">
                  <div className="mb-2">
                    <TextField
                      fullWidth
                      label="Street Address"
                      variant="outlined"
                      type="text"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleChange}
                      placeholder="Enter your street address"
                      required={!isLogin}
                      sx={{ marginBottom: 1 }}
                    />
                  </div>
                  
                  <div className="mb-2">
                    <TextField
                      fullWidth
                      label="City"
                      variant="outlined"
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      required={!isLogin}
                      sx={{ marginBottom: 1 }}
                    />
                  </div>
                  
                  <div className="mb-2">
                    <TextField
                      fullWidth
                      label="State"
                      variant="outlined"
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      placeholder="Enter your state"
                      required={!isLogin}
                      sx={{ marginBottom: 1 }}
                    />
                  </div>
                  
                  <div className="mb-2">
                    <TextField
                      fullWidth
                      label="Country"
                      variant="outlined"
                      type="text"
                      name="address.country"
                      value={formData.address.country}
                      onChange={handleChange}
                      placeholder="Enter your country"
                      required={!isLogin}
                      sx={{ marginBottom: 1 }}
                    />
                  </div>
                  
                  <div className="mb-2">
                    <TextField
                      fullWidth
                      label="Pincode"
                      variant="outlined"
                      type="text"
                      name="address.pincode"
                      value={formData.address.pincode}
                      onChange={handleChange}
                      placeholder="Enter your pincode"
                      required={!isLogin}
                      sx={{ marginBottom: 1 }}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {!isLogin && (
              <div>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            )}

            {isLogin && (
              <div className='flex items-center justify-between'>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <a href="#" className='text-sm text-blue-600 hover:text-blue-500'>
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className='w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          {/* Toggle between Login and Sign Up */}
          <p className='text-center text-sm text-gray-600'>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className='font-medium text-blue-600 hover:text-blue-500'
            >
              {isLogin ? "Sign up now, it's free!" : "Sign in"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Background Image with Content */}
      <div className='hidden lg:flex flex-1 relative bg-blue-700'>
        <div className='absolute inset-0 flex flex-col justify-center items-center text-white p-12'>
          <div className='max-w-md space-y-8'>
            {/* Logo Icons Grid */}
            <div className='grid grid-cols-3 gap-8'>
              <div className='bg-white/10 p-4 rounded-xl'>
                <i className="ri-plane-line text-3xl"></i>
              </div>
              <div className='bg-white/10 p-4 rounded-xl'>
                <i className="ri-hotel-line text-3xl"></i>
              </div>
              <div className='bg-white/10 p-4 rounded-xl'>
                <i className="ri-map-pin-line text-3xl"></i>
              </div>
              <div className='bg-white/10 p-4 rounded-xl'>
                <i className="ri-compass-3-line text-3xl"></i>
              </div>
              <div className='bg-white/10 p-4 rounded-xl'>
                <i className="ri-earth-line text-3xl"></i>
              </div>
              <div className='bg-white/10 p-4 rounded-xl'>
                <i className="ri-suitcase-line text-3xl"></i>
              </div>
            </div>

            {/* Website Name */}
            <h1 className='text-2xl font-bold'>JUST TRIP</h1>

            {/* Description */}
            <p className='text-xl leading-relaxed'>
              Your journey begins here – Discover amazing destinations, find the best deals, 
              and create memories that last a lifetime with Just Trip, your trusted travel companion.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
