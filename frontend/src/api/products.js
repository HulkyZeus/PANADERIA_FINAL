import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:4000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token') || Cookies.get('token');
  console.log('Current token:', token); // Debug log
  if (!token) {
    throw new Error('No token available');
  }
  return { Authorization: `Bearer ${token}` };
};

export const createProduct = async (formData) => {
  try {
    const headers = {
      ...getAuthHeader(),
      'Content-Type': 'multipart/form-data'
    };
    console.log('Request headers:', headers); // Debug log
    const response = await axios.post(`${API_URL}/products`, formData, { headers });
    return response;
  } catch (error) {
    console.error('Error completo:', error.response?.data || error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/products/${category}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const headers = {
      ...getAuthHeader(),
      'Content-Type': 'multipart/form-data'
    };
    const response = await axios.put(`${API_URL}/products/${id}`, productData, { headers });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${id}`, {
      headers: getAuthHeader()
    });
    return response;
  } catch (error) {
    throw error;
  }
};