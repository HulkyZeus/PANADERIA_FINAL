import axios from "./axios.js";

export const loginRequest = (credentials) => axios.post("/auth/login", credentials);

export const registerRequest = (user) => axios.post("/auth/register", user);

export const logoutRequest = () => axios.post("/auth/logout");

export const verifyTokenRequest = () => axios.get("/auth/verify");