import axios from "./axios";

export const getPedidosRequest = () => axios.get("/pedidos");

export const getPedidoRequest = (id) => axios.get(`/pedidos/${id}`);

export const createPedidoRequest = (pedido) => axios.post("/pedidos", pedido);

export const updatePedidoRequest = (id, pedido) => axios.put(`/pedidos/${id}`, pedido);

export const deletePedidoRequest = (id) => axios.delete(`/pedidos/${id}`);