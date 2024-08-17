// DashLayout.js
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Topnav from '../../Component/Dashboard/WIdget/Topnav';
import Sidebar from '../../Component/Dashboard/WIdget/Sidebar';
import { UserProvider, useUser } from '../../Context/AuthContext';
import { userService } from '../../Services/authService';
// import Footer from '../../Component/Footer';


const DashLayout = ({ children }) => {
  const { user, setUser } = useUser(); // Access the user context

  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await userService.fetchProfileData();
        // console.log("Fetched Data: ", data);
        if (data.status === 'success') {
          setUser(data.user);
          console.log("User Set: ", data.user);
        } else {
          console.log("Failed Fetching User");
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        console.error("Error Fetching User: ", error);
        navigate('/dashboard', { replace: true });
      }
    };
    
    

    getUserData();
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
            {/* <Footer /> */}
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
