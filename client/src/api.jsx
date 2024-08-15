import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/auth', // adjust the baseURL to match your backend API
  withCredentials: true, // enable sending cookies with requests
});

export const register = async (data) => {
  return await api.post('/register', data);
};

export const login = async (data) => {
  return await api.post('/login', data);
};

export const fetchAdminData = async () => {
  return await api.get('/admin');
};

export const fetchUserData = async () => {
  return await api.get('/user');
};
