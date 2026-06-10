import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/auth';

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });

  // ✅ Correctly extract token and user from the backend response
  const token = response.data.token;
  const user = response.data.data.user;

  return { user, token };
};

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data.data;
};

export { login, register };
