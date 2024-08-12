import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DestinationForm = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [place, setPlace] = useState('');
    const [images, setImages] = useState([null, null, null]);

    useEffect(() => {
        // Fetch destination data if editing
        if (id) {
            const fetchDestination = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/destinations/${id}`);
                    const { title, description, place, image1, image2, image3 } = response.data;
                    setTitle(title);
                    setDescription(description);
                    setPlace(place);
                    setImages([image1, image2, image3]);
                } catch (error) {
                    console.error('Failed to fetch destination:', error.response ? error.response.data : error.message);
                }
            };

            fetchDestination();
        }
    }, [id]);

    const handleImageChange = (index, event) => {
        const newImages = [...images];
        newImages[index] = event.target.files[0];
        setImages(newImages);
    };

    const handleSubmit = async (method) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('place', place);
        if (images[0]) formData.append('image1', images[0]);
        if (images[1]) formData.append('image2', images[1]);
        if (images[2]) formData.append('image3', images[2]);

        try {
            let response;

            if (method === 'POST') {
                response = await axios.post('http://localhost:3000/api/destinations', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else if (method === 'PUT') {
                response = await axios.put(`http://localhost:3000/api/destinations/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            if (response?.status === 200) {
                console.log(`Destination ${method === 'POST' ? 'created' : 'updated'} successfully`);
            }
        } catch (error) {
            console.error(`Failed to ${method === 'POST' ? 'create' : 'update'} destination:`, error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <form>
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

                {images.map((image, index) => (
                    <input
                        key={index}
                        type="file"
                        placeholder={`Image ${index + 1}`}
                        onChange={(e) => handleImageChange(index, e)}
                        required={index === 0 && !image}
                    />
                ))}
            </form>

            <button onClick={() => handleSubmit(id ? 'PUT' : 'POST')}>
                {id ? 'Update Destination' : 'Create Destination'}
            </button>
        </div>
    );
};

export default DestinationForm;
