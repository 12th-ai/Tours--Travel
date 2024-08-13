import React from 'react'
import '../../../assets/Style/client_style/sidebar.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';

function Sidebar() {

  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout', null, {
        withCredentials: true, // Include credentials (like cookies) if needed
      });
    
      // Redirect to the login page
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
  

    <aside class="toggled" v-else>
    <div className="top">
      <div className="logo">
        <img src={require('../../../assets/images/frexilogo.png')} alt="SJITC Logo" />
        <span>Frexi tours && travels</span>
      </div> 
      <nav>
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><path d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z"/></svg>
          <span>Home</span>
        </Link>
        <Link to="/studentrecords">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><path d="M17.470703 10.986328 A 1.50015 1.50015 0 0 0 16.439453 11.439453L9.5 18.378906L6.5605469 15.439453 A 1.50015 1.50015 0 1 0 4.4394531 17.560547L8.4394531 21.560547 A 1.50015 1.50015 0 0 0 10.560547 21.560547L18.560547 13.560547 A 1.50015 1.50015 0 0 0 17.470703 10.986328 z M 21.5 15 A 1.50015 1.50015 0 1 0 21.5 18L42.5 18 A 1.50015 1.50015 0 1 0 42.5 15L21.5 15 z M 15.486328 25.978516 A 1.50015 1.50015 0 0 0 14.439453 26.439453L10.5 30.378906L6.5605469 26.439453 A 1.50015 1.50015 0 0 0 5.484375 25.984375 A 1.50015 1.50015 0 0 0 4.4394531 28.560547L8.3789062 32.5L4.4394531 36.439453 A 1.50015 1.50015 0 1 0 6.5605469 38.560547L10.5 34.621094L14.439453 38.560547 A 1.50015 1.50015 0 1 0 16.560547 36.439453L12.621094 32.5L16.560547 28.560547 A 1.50015 1.50015 0 0 0 15.486328 25.978516 z M 21.5 31 A 1.50015 1.50015 0 1 0 21.5 34L42.5 34 A 1.50015 1.50015 0 1 0 42.5 31L21.5 31 z"/></svg>
          <span>Attendance</span>
        </Link>
        <Link to="/profile">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><path d="M39.139,26.282C38.426,25.759,38,24.919,38,24.034s0.426-1.725,1.138-2.247l3.294-2.415c0.525-0.386,0.742-1.065,0.537-1.684c-0.848-2.548-2.189-4.872-3.987-6.909c-0.433-0.488-1.131-0.642-1.728-0.38l-3.709,1.631c-0.808,0.356-1.749,0.305-2.516-0.138c-0.766-0.442-1.28-1.23-1.377-2.109l-0.446-4.072c-0.071-0.648-0.553-1.176-1.191-1.307c-2.597-0.531-5.326-0.54-7.969-0.01c-0.642,0.129-1.125,0.657-1.196,1.308l-0.442,4.046c-0.097,0.88-0.611,1.668-1.379,2.11c-0.766,0.442-1.704,0.495-2.515,0.138l-3.729-1.64c-0.592-0.262-1.292-0.11-1.725,0.377c-1.804,2.029-3.151,4.35-4.008,6.896c-0.208,0.618,0.008,1.301,0.535,1.688l3.273,2.4C9.574,22.241,10,23.081,10,23.966s-0.426,1.725-1.138,2.247l-3.294,2.415c-0.525,0.386-0.742,1.065-0.537,1.684c0.848,2.548,2.189,4.872,3.987,6.909c0.433,0.489,1.133,0.644,1.728,0.38l3.709-1.631c0.808-0.356,1.748-0.305,2.516,0.138c0.766,0.442,1.28,1.23,1.377,2.109l0.446,4.072c0.071,0.648,0.553,1.176,1.191,1.307C21.299,43.864,22.649,44,24,44c1.318,0,2.648-0.133,3.953-0.395c0.642-0.129,1.125-0.657,1.196-1.308l0.443-4.046c0.097-0.88,0.611-1.668,1.379-2.11c0.766-0.441,1.705-0.493,2.515-0.138l3.729,1.64c0.594,0.263,1.292,0.111,1.725-0.377c1.804-2.029,3.151-4.35,4.008-6.896c0.208-0.618-0.008-1.301-0.535-1.688L39.139,26.282z M24,31c-3.866,0-7-3.134-7-7s3.134-7,7-7s7,3.134,7,7S27.866,31,24,31z"/></svg>
          <span>Settings</span>
        </Link>
      </nav>
    </div>
    <div className='logOut'  onClick={handleLogout}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><path d="M23.970703 3.9726562 A 2.0002 2.0002 0 0 0 22 6L22 22 A 2.0002 2.0002 0 1 0 26 22L26 6 A 2.0002 2.0002 0 0 0 23.970703 3.9726562 z M 17.03125 9.5957031 A 2.0002 2.0002 0 0 0 16.125 9.8105469C10.126881 12.732506 6 18.900262 6 26C6 35.917759 14.082241 44 24 44C33.917759 44 42 35.917759 42 26C42 18.900051 37.873521 12.733423 31.876953 9.8105469 A 2.0003292 2.0003292 0 1 0 30.123047 13.40625C34.782479 15.677373 38 20.447949 38 26C38 33.756241 31.756241 40 24 40C16.243759 40 10 33.756241 10 26C10 20.447738 13.215119 15.676291 17.875 13.40625 A 2.0002 2.0002 0 0 0 17.03125 9.5957031 z"/></svg>
      <span>Log Out</span>
    </div>
  </aside>



  )
}

export default Sidebar
