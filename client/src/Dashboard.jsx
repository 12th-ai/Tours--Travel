// src/components/Tours.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tours() {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/tours/')
      .then(res => {
        setTours(res.data);
      })
      .catch(err => {
        setError('Error fetching tours');
      });
  }, []);

  return (
    <div>
      <h1>Tours</h1>
      {error && <p>{error}</p>}
      <ul>
        {tours.map(tour => (
          <li key={tour.id}>
            <h2>{tour.title}</h2>
            <p>{tour.description}</p>
            <p>{tour.location}</p>
            <p>{tour.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tours;
