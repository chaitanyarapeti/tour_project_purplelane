import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper, Container, Box } from '@mui/material';

const AdminPage = () => {
  const [packageData, setPackageData] = useState({
    name: '',
    destination: '',
    duration: '',
    price: '',
    maxGroupSize: '',
    description: '',
    availability: true,
    images: [],
    itinerary: [
      {
        day: 1,
        title: '',
        activities: ['']
      }
    ],
    tags: ['']
  });

  const [message, setMessage] = useState({ type: '', content: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItineraryChange = (dayIndex, field, value) => {
    setPackageData(prev => {
      const newItinerary = [...prev.itinerary];
      newItinerary[dayIndex] = {
        ...newItinerary[dayIndex],
        [field]: value
      };
      return { ...prev, itinerary: newItinerary };
    });
  };

  const handleActivityChange = (dayIndex, activityIndex, value) => {
    setPackageData(prev => {
      const newItinerary = [...prev.itinerary];
      const newActivities = [...newItinerary[dayIndex].activities];
      newActivities[activityIndex] = value;
      newItinerary[dayIndex] = {
        ...newItinerary[dayIndex],
        activities: newActivities
      };
      return { ...prev, itinerary: newItinerary };
    });
  };

  const addDay = () => {
    setPackageData(prev => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          day: prev.itinerary.length + 1,
          title: '',
          activities: ['']
        }
      ]
    }));
  };

  const addActivity = (dayIndex) => {
    setPackageData(prev => {
      const newItinerary = [...prev.itinerary];
      newItinerary[dayIndex].activities.push('');
      return { ...prev, itinerary: newItinerary };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPackageData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleTagChange = (index, value) => {
    setPackageData(prev => {
      const newTags = [...prev.tags];
      newTags[index] = value;
      return { ...prev, tags: newTags };
    });
  };

  const addTag = () => {
    setPackageData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      // Append all the package data
      Object.keys(packageData).forEach(key => {
        if (key === 'images') {
          packageData.images.forEach(image => {
            formData.append('images', image);
          });
        } else if (key === 'itinerary' || key === 'tags') {
          formData.append(key, JSON.stringify(packageData[key]));
        } else {
          formData.append(key, packageData[key]);
        }
      });

      const response = await axios.post('http://localhost:5001/api/package/insertPackage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage({ type: 'success', content: 'Tour package created successfully!' });
      // Reset form
      setPackageData({
        name: '',
        destination: '',
        duration: '',
        price: '',
        maxGroupSize: '',
        description: '',
        availability: true,
        images: [],
        itinerary: [{ day: 1, title: '', activities: [''] }],
        tags: ['']
      });
    } catch (error) {
      console.error('Error creating package:', error);
      setMessage({ 
        type: 'error', 
        content: error.response?.data?.message || 'Error creating tour package' 
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Create Tour Package
        </Typography>

        {message.content && (
          <Box sx={{ 
            mb: 2, 
            p: 2, 
            bgcolor: message.type === 'success' ? 'success.light' : 'error.light',
            borderRadius: 1
          }}>
            <Typography color={message.type === 'success' ? 'success.dark' : 'error.dark'}>
              {message.content}
            </Typography>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gap: 3 }}>
            {/* Basic Information */}
            <TextField
              required
              label="Package Name"
              name="name"
              value={packageData.name}
              onChange={handleChange}
            />
            <TextField
              required
              label="Destination"
              name="destination"
              value={packageData.destination}
              onChange={handleChange}
            />
            <TextField
              required
              label="Duration"
              name="duration"
              value={packageData.duration}
              onChange={handleChange}
              placeholder="e.g., 5 days"
            />
            <TextField
              required
              label="Price"
              name="price"
              type="number"
              value={packageData.price}
              onChange={handleChange}
            />
            <TextField
              required
              label="Max Group Size"
              name="maxGroupSize"
              type="number"
              value={packageData.maxGroupSize}
              onChange={handleChange}
            />
            <TextField
              required
              label="Description"
              name="description"
              multiline
              rows={4}
              value={packageData.description}
              onChange={handleChange}
            />

            {/* Images */}
            <Box>
              <Typography variant="h6" gutterBottom>Images</Typography>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </Box>

            {/* Itinerary */}
            <Box>
              <Typography variant="h6" gutterBottom>Itinerary</Typography>
              {packageData.itinerary.map((day, dayIndex) => (
                <Box key={dayIndex} sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                  <Typography variant="subtitle1" gutterBottom>Day {day.day}</Typography>
                  <TextField
                    fullWidth
                    label="Day Title"
                    value={day.title}
                    onChange={(e) => handleItineraryChange(dayIndex, 'title', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  {day.activities.map((activity, actIndex) => (
                    <TextField
                      key={actIndex}
                      fullWidth
                      label={`Activity ${actIndex + 1}`}
                      value={activity}
                      onChange={(e) => handleActivityChange(dayIndex, actIndex, e.target.value)}
                      sx={{ mb: 1 }}
                    />
                  ))}
                  <Button onClick={() => addActivity(dayIndex)}>Add Activity</Button>
                </Box>
              ))}
              <Button onClick={addDay}>Add Day</Button>
            </Box>

            {/* Tags */}
            <Box>
              <Typography variant="h6" gutterBottom>Tags</Typography>
              {packageData.tags.map((tag, index) => (
                <TextField
                  key={index}
                  fullWidth
                  label={`Tag ${index + 1}`}
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  sx={{ mb: 1 }}
                />
              ))}
              <Button onClick={addTag}>Add Tag</Button>
            </Box>

            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ mt: 2 }}
            >
              Create Tour Package
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminPage;
