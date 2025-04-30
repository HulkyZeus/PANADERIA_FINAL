import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api', 
    withCredentials: true // Permite el envío de cookies
});

export default instance;