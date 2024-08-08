// src/components/TourForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TourForm = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [place, setPlace] = useState('');
  const [tourDetail, setTourDetail] = useState('');
  const [gallery, setGallery] = useState(['', '', '']);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/tours', {
        title,
        location,
        description,
        time,
        price,
        place,
        tourDetail,
        gallery,
      });
      setMessage('Tour created successfully');
      console.log(response.data);
    } catch (error) {
      setMessage('Error creating tour');
      console.error('Error creating tour:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Tour</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Place:</label>
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Tour Detail:</label>
        <textarea
          value={tourDetail}
          onChange={(e) => setTourDetail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Gallery:</label>
        {gallery.map((image, index) => (
          <input
            key={index}
            type="text"
            value={image}
            onChange={(e) => {
              const newGallery = [...gallery];
              newGallery[index] = e.target.value;
              setGallery(newGallery);
            }}
            placeholder={`Image ${index + 1}`}
          />
        ))}
      </div>
      <button type="submit">Create Tour</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default TourForm;
