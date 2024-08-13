// DashLayout.js
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Topnav from '../../Component/Dashboard/WIdget/Topnav';
import Sidebar from '../../Component/Dashboard/WIdget/Sidebar';
import { UserProvider, useUser } from '../../Context/AuthContext';

const DashLayout = ({ children }) => {
  const { user, setUser } = useUser(); // Access the user context

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
          withCredentials: true, // Include credentials (like cookies) if needed
        });

        if (response.data.status === 'success') {
          setUser(response.data.user); // Set user data if status is success
        } else {
          navigate('/dashboard', { replace: true }); // Redirect if status is not success
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/dashboard', { replace: true }); // Redirect on error
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserData();
  }, [navigate, setUser]);



  if (!user) {
    // Redirect to the login page if user data is not available
    return null; // Or return an empty fragment <></> as the redirect is handled in the useEffect
  }

  return (
    <div>
      <main>
        <Sidebar />
        <div className="router">
          <div className="router-page">
            <Topnav />
            <div className="innerPage">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Wrap DashLayout with UserProvider before exporting
export default function DashLayoutWrapper(props) {
  return (
    <UserProvider>
      <DashLayout {...props} />
    </UserProvider>
  );
}
