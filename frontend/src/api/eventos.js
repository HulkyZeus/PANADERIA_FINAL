import axios from "./axios";

export const getEventosRequest = () => axios.get("/eventos");

export const getEventoRequest = (id) => axios.get(`/eventos/${id}`);

export const createEventoRequest = (evento) => axios.post("/eventos", evento);

export const updateEventoRequest = (id, evento) => axios.put(`/eventos/${id}`, evento);

export const deleteEventoRequest = (id) => axios.delete(`/eventos/${id}`);