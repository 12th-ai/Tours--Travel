import React, { useEffect, useState } from 'react';
import { fetchAdminData } from '..///../api';

const AdminDashboard = () => {
  const [data, setData] = useState('');


  useEffect(() => {
    const getData = async () => {
 
      try {
        const response = await fetchAdminData();
      
        setData(response.data.message);
      } catch (error) {
        alert('Failed to fetch data');
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>{data}</p>
    </div>
  );
};

export default AdminDashboard;
