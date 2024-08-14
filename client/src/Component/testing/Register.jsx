import React, { useState } from 'react';


const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      alert('Registration successful!');
    } catch (error) {
      alert(error.response.data.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <label>
          <input type="checkbox" name="isAdmin" onChange={() => setFormData({ ...formData, isAdmin: !formData.isAdmin })} />
          Admin
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
