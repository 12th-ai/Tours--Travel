import React, { useState } from 'react';
import axios from 'axios';

const DestinationForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [place, setPlace] = useState('');
    const [images, setImages] = useState([null, null, null]);

    const handleImageChange = (index, event) => {
        const newImages = [...images];
        newImages[index] = event.target.files[0];
        setImages(newImages);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('place', place);
        if (images[0]) formData.append('image1', images[0]);
        if (images[1]) formData.append('image2', images[1]);
        if (images[2]) formData.append('image3', images[2]);
    
        try {
            const response = await axios.post('http://localhost:3000/api/destinations/destinations/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Server response:', response.data);
            if (response.status === 200) {
                console.log('Destination added successfully');
            }
        } catch (error) {
            console.error('Failed to add destination:', error.response ? error.response.data : error.message);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <input
          <form onSubmit={event => { { handleSubmit; } }}>
          <input type="text" name="username" placeholder="Username" onChange={event => { { handleChange; } }} />
          <input type="email" name="email" placeholder="Email" onChange={event => { { handleChange; } }} />
          <input type="password" name="password" placeholder="Password" onChange={event => { { handleChange; } }} /></form>
            <button type="submit">Add Destination</button>
        </form>
    );
};

export default DestinationForm;


<form onSubmit={event => { { handleSubmit; } }}>
      <h2>Forgot Password</h2>
      <input type="email" value="{email}" onChange={event => { // TODO: Fix event handler code
`{(e)`; }} =="" /> setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      /></form>