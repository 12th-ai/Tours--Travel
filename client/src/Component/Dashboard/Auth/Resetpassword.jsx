import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle OTP submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/verify-otp', { email, otp });
      if (response.data.success) {
 // Move to the next step to set a new password
        toast.success(response.data.message, {
          autoClose: 2500 // Notification will be displayed for 2 seconds
      });
      setTimeout(() => {
        setStep(2);// Redirect to login page after 2 seconds
      }, 3200);
      } else {
        toast.error('Invalid OTP. Please check your email and try again.', { autoClose: 10000 });
      }


    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.');
      console.log(error.message);
    }
  };

  // Handle new password submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/reset-password', { email, otp, newPassword });
      toast.success(response.data.message, {
        autoClose: 2500 // Notification will be displayed for 2 seconds
    });
    setTimeout(() => {
      navigate('/dashboard');
    }, 3200);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred while resetting your password.');
      console.log(error.message);
    }
  };

  return (
    <div className='form-page'>
      
      {step === 1 ? (
      
          <div className="form" id='form-otp'>
          <h2 className="formTitle" id='otp'>Enter OTP Code</h2>
        <form onSubmit={handleOtpSubmit}>
          <div className="crd">
            <div className="crd-input otp-input-check">
   
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="crd">
            <div className="crd-input otp-input-check">
     
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
              />
            </div>
          </div>
          <button type="submit">Verify OTP</button>
          {message && <p>{message}</p>}
        </form>
        </div>
      

      ) : (
        
          <div className="form" id='form-otp'>
          <p className="formTitle">Final Step! Reset Your Password</p>
        <form onSubmit={handlePasswordSubmit}>

          <div className="crd">
            <div className="crd-input otp-input-check">
           
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>
          </div>
          <button type="submit">Reset Password</button>
       
        </form>
        </div>
      
      )}
    </div>
  );
};

export default ResetPassword;
