import { Router } from "express";
import { 
  crearCliente, 
  actualizarCliente, 
  getClientePorCedula,
  obtenerClientePorUsuario,
  getClientes,
  getCliente,
  deleteCliente
} from "../controllers/clientes.controller.js";

const router = Router();

// Rutas para clientes
router.post("/", crearCliente);
router.put("/:cedula", actualizarCliente);
router.get("/cedula/:cedula", getClientePorCedula);
router.get("/usuario/:usuario_id", obtenerClientePorUsuario);

// Rutas para administrador
router.get("/", getClientes);
router.get("/:id", getCliente);
router.delete("/:id", deleteCliente);

export default router; 