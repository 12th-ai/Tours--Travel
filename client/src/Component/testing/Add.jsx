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
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>
            <input
                type="text"
                placeholder="Place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                required
            />

            {images.map((_, index) => (
                <input
                    key={index}
                    type="file"
                    placeholder={`Image ${index + 1}`}
                    onChange={(e) => handleImageChange(index, e)}
                    required={index === 0}
                />
            ))}

            <button type="submit">Add Destination</button>
        </form>
    );
};

export default DestinationForm;
