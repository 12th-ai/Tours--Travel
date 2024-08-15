import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import validateLogin from '../validation/validateLogin';

const LoginPage = () => {
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateLogin(credentials);
        if (Object.keys(validationErrors).length === 0) {
            await login(credentials.username, credentials.password);
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
            />
            {errors.username && <p>{errors.username}</p>}
            
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
            
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;
