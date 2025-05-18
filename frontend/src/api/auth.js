import axios from './axios'

export const registerRequest = user => axios.post(`/register`, user, {
    withCredentials: true
})

export const loginRequest = user => axios.post(`/login`, user, {
    withCredentials: true
})

export const verifyTokenRequest = () => axios.get('/verify', {
  withCredentials: true
})