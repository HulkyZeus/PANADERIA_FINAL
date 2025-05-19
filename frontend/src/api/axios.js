import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptor para agregar el token a todas las peticiones
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores de autenticación y logging
instance.interceptors.response.use(
    (response) => {
        console.log('Response:', response.config.url, response.data);
        return response;
    },
    (error) => {
        console.error('Response error:', error.config?.url, error.response?.data);
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            Cookies.remove('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance;