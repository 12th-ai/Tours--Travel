import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/auth/forgot-password', { email }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      toast.success(response.data.message, {
        autoClose: 2500 
      });

      setTimeout(() => {
        navigate('/dashboard/otp');
      }, 3200);

    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      // Perform OTP validation here
      console.log('OTP submitted:', otp);
    } else {
      toast.error('Please enter a valid 6-digit OTP.');
    }
  };

  return (
    <div className="form-page">
      <form onSubmit={handleSubmit}>
        <div className="crd">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      </form>

      <form onSubmit={handleOtpSubmit}>
        <div className="crd">
          <label>Enter OTP</label>
          <div className="crd-input otp-input-check">
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              required
            />
          </div>
        </div>
        <button type="submit" disabled={loading || otp.length !== 6}>
          {loading ? 'Checking OTP...' : 'Confirm'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
