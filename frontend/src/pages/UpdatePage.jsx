import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Paper, Container, Box } from '@mui/material';

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/package/displayPackages/${id}`);
        setPackageData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching package data');
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [id]);

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
      newItinerary[dayIndex].activities[activityIndex] = value;
      return { ...prev, itinerary: newItinerary };
    });
  };

  const handleTagChange = (index, value) => {
    setPackageData(prev => {
      const newTags = [...prev.tags];
      newTags[index] = value;
      return { ...prev, tags: newTags };
    });
  };

  const addActivity = (dayIndex) => {
    setPackageData(prev => {
      const newItinerary = [...prev.itinerary];
      newItinerary[dayIndex].activities.push('');
      return { ...prev, itinerary: newItinerary };
    });
  };

  const addTag = () => {
    setPackageData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5001/api/package/update/${id}`, packageData);
      navigate(`/information/${id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating package');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Update Tour Package
        </Typography>

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

            {/* Itinerary */}
            <Box>
              <Typography variant="h6" gutterBottom>Itinerary</Typography>
              {packageData.itinerary.map((day, dayIndex) => (
                <Box key={dayIndex} sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                  <Typography variant="h6">Day {day.day}</Typography>
                  <TextField
                    fullWidth
                    label="Day Title"
                    value={day.title}
                    onChange={(e) => handleItineraryChange(dayIndex, 'title', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  {day.activities.map((activity, activityIndex) => (
                    <TextField
                      key={activityIndex}
                      fullWidth
                      label={`Activity ${activityIndex + 1}`}
                      value={activity}
                      onChange={(e) => handleActivityChange(dayIndex, activityIndex, e.target.value)}
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
              Update Tour Package
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdatePage;
