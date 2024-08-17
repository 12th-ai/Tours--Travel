import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // console.log('Final email:', email); // Added log

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // console.log('Final email:', email); // Added log
      const response = await axios.post('http://localhost:3000/api/auth/forgot-password', { email }, {
        withCredentials: true, // Include credentials with the request
        headers: {
          'Content-Type': 'application/json'
        }
      });


      toast.success(response.data.message, {
        autoClose: 2500 // Notification will be displayed for 2 seconds
    });
    setTimeout(() => {
        navigate('/dashboard/reset'); // Redirect to login page after 2 seconds
    }, 3200);
    console.log('Final email:', email); // Added log
    }catch (error) {
      if (error.response) {
        // The server responded with a status code that falls out of the range of 2xx
        const { status } = error.response;
        if (status === 404) {
          toast.error('Email not found. Please check and try again.');
        } else {
          toast.error('An error occurred. Please try again.');
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response from the server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error('Error in setting up the request. Please try again.');
      }
      console.error(error);
    } finally {
      setLoading(false);
      console.log('Final email:', email); // Log the email value
    }
  };

  return (
    <div className="form-page">
      <h1>Reset Password?</h1>
      <div className="form">
        <p className="formTitle">Enter the email associated with your account to receive an OTP code.</p>
        <form onSubmit={handleSubmit}>
          <div className="crd">
            <div className="crd-input">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path d="M10.5 8C6.9280619 8 4 10.928062 4 14.5L4 33.5C4 37.071938 6.9280619 40 10.5 40L37.5 40C41.071938 40 44 37.071938 44 33.5L44 14.5C44 10.928062 41.071938 8 37.5 8L10.5 8 z M 10.5 11L37.5 11C39.450062 11 41 12.549938 41 14.5L41 15.605469L24 24.794922L7 15.605469L7 14.5C7 12.549938 8.5499381 11 10.5 11 z M 7 19.015625L23.287109 27.820312 A 1.50015 1.50015 0 0 0 24.712891 27.820312L41 19.015625L41 33.5C41 35.450062 39.450062 37 37.5 37L10.5 37C8.5499381 37 7 35.450062 7 33.5L7 19.015625 z" />
                </svg>
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Sending, Please wait...' : 'Receive Code'}
          </button>
          <Link to="/dashboard" className="reset">Back to Login</Link>
        </form>

      </div>
    </div>
  );
};

export default ForgotPassword;
