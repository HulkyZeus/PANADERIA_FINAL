import axios from "./axios";

export const getAdminsRequest = () => axios.get("/admin");

export const getAdminRequest = (id) => axios.get(`/admin/${id}`);

export const createAdminRequest = (admin) => axios.post("/admin", admin);

export const updateAdminRequest = (id, admin) => axios.put(`/admin/${id}`, admin);

export const deleteAdminRequest = (id) => axios.delete(`/admin/${id}`);