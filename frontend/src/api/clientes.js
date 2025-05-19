import axios from './axios';

export const createClienteRequest = (cliente) => axios.post('/clientes', cliente);

export const updateClienteRequest = (cedula, cliente) => axios.put(`/clientes/cedula/${cedula}`, cliente);

export const getClienteByCedula = (cedula) => axios.get(`/clientes/cedula/${cedula}`);

export const getClienteByUsuario = (usuario_id) => axios.get(`/clientes/usuario/${usuario_id}`); 