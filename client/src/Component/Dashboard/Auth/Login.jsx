import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { userService } from "../../../Services/authService"; // Adjust the path as needed


const Login = () => {

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const responseData = await userService.login(credentials);

      toast.success(responseData.message, {
          autoClose: 1300 // Notification will be displayed for 1.3 seconds
      });

      setTimeout(() => {
          navigate('/dashboard/protected'); // Redirect to dashboard after 3.2 seconds
          setLoading(true);
        }, 3000);

    } catch (error) {
      toast.error(error.message, { autoClose:2000 });
      console.error('Login failed:', error);
      setLoading(true);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <h1 className="text bg-yellow-300">Login  to  <br/>
      <span v-if="showAdmin == true"> FREXI tours && TRAVEL </span>
 
    </h1>
      <div className="form">
        <div className="logo">
          <img src={require("../../../assets/images/frexilogo.png")} alt="" />

          <p>FREXI Tours and Travel</p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="crd">
            <label htmlFor="">user name</label>
            <div className="crd-input">
              <input
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="please enter your user name"
              />
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 48 48"
                >
                  <path d="M24 4C18.494917 4 14 8.494921 14 14C14 19.505079 18.494917 24 24 24C29.505083 24 34 19.505079 34 14C34 8.494921 29.505083 4 24 4 z M 24 7C27.883764 7 31 10.116238 31 14C31 17.883762 27.883764 21 24 21C20.116236 21 17 17.883762 17 14C17 10.116238 20.116236 7 24 7 z M 12.5 28C10.032499 28 8 30.032499 8 32.5L8 33.699219C8 36.640082 9.8647133 39.277974 12.708984 41.091797C15.553256 42.90562 19.444841 44 24 44C28.555159 44 32.446744 42.90562 35.291016 41.091797C38.135287 39.277974 40 36.640082 40 33.699219L40 32.5C40 30.032499 37.967501 28 35.5 28L12.5 28 z M 12.5 31L35.5 31C36.346499 31 37 31.653501 37 32.5L37 33.699219C37 35.364355 35.927463 37.127823 33.677734 38.5625C31.428006 39.997177 28.068841 41 24 41C19.931159 41 16.571994 39.997177 14.322266 38.5625C12.072537 37.127823 11 35.364355 11 33.699219L11 32.5C11 31.653501 11.653501 31 12.5 31 z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="crd">
            <label htmlFor="">user name</label>
            <div className="crd-input">
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="please enter your password"
              />
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 48 48"
                >
                  <path d="M24 4C18.494917 4 14 8.494921 14 14C14 19.505079 18.494917 24 24 24C29.505083 24 34 19.505079 34 14C34 8.494921 29.505083 4 24 4 z M 24 7C27.883764 7 31 10.116238 31 14C31 17.883762 27.883764 21 24 21C20.116236 21 17 17.883762 17 14C17 10.116238 20.116236 7 24 7 z M 12.5 28C10.032499 28 8 30.032499 8 32.5L8 33.699219C8 36.640082 9.8647133 39.277974 12.708984 41.091797C15.553256 42.90562 19.444841 44 24 44C28.555159 44 32.446744 42.90562 35.291016 41.091797C38.135287 39.277974 40 36.640082 40 33.699219L40 32.5C40 30.032499 37.967501 28 35.5 28L12.5 28 z M 12.5 31L35.5 31C36.346499 31 37 31.653501 37 32.5L37 33.699219C37 35.364355 35.927463 37.127823 33.677734 38.5625C31.428006 39.997177 28.068841 41 24 41C19.931159 41 16.571994 39.997177 14.322266 38.5625C12.072537 37.127823 11 35.364355 11 33.699219L11 32.5C11 31.653501 11.653501 31 12.5 31 z" />
                </svg>
              </div>
            </div>

            <div className="redirect">
              <p>
                don't have account ? <Link to='/dashboard/register'>register</Link>
             
              </p>
            </div>

            <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Sign in "}
          </button>
            <div className="forgot">
            <Link to='forgot'>forgot password</Link>
            </div>
        
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
