import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true, // Solo esto para autenticación por cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Elimina el interceptor de request que añade el token Bearer
// ya que estás usando cookies HTTP-Only

// Modifica el interceptor de response:
instance.interceptors.response.use(
  (response) => {
    console.log('Response:', response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.config?.url, error.response?.data);

    // Lista de rutas públicas que NO deben redirigir al login aunque den 401
    const publicRoutes = ['/login', '/register', '/verify', '/api', '/menu', '/'];

    const isPublic = publicRoutes.some(route =>
      error.config?.url?.toLowerCase().includes(route)
    );

    if (error.response?.status === 401 && !isPublic) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default instance;