import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DestinationTable = () => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        // Fetch destinations from the backend
        const fetchDestinations = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/destinations/destinations');
                setDestinations(response.data);
            } catch (error) {
                console.error('Failed to fetch destinations:', error.response ? error.response.data : error.message);
            }
        };

        fetchDestinations();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/destinations/${id}`);
            if (response?.status === 200) {
                console.log('Destination deleted successfully');
                setDestinations(destinations.filter(destination => destination.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete destination:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h2>Destination List</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {destinations.map(destination => (
                    <div
                        key={destination.id}
                        style={{
                            border: '1px solid #ccc',
                            padding: '20px',
                            borderRadius: '8px',
                            width: '300px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center'
                        }}
                    >
                        {destination.image1 && (
                            <img
                                src={`http://localhost/Tours&&Travel/backend/uploads/${destination.image1}`}
                                alt={destination.title}
                                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                            />
                        )}
                        <h3>{destination.title}</h3>
                        <div style={{ marginTop: '20px' }}>
                            <Link to={`/view-destination/${destination.id}`}>
                                <button style={{ marginRight: '10px' }}>View All</button>
                            </Link>
                            <Link to={`/edit-destination/${destination.id}`}>
                                <button style={{ marginRight: '10px' }}>Edit</button>
                            </Link>
                            <button onClick={() => handleDelete(destination.id)} style={{ backgroundColor: '#ff4d4d' }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DestinationTable;
