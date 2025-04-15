import Pedido from "../models/pedidos.model.js";

export const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario_id: req.user.id }); // Solo sus pedidos
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findOne({
      _id: req.params.id,
      usuario_id: req.user.id,
    });
    if (!pedido)
      return res.status(404).json({ message: "Pedido no encontrado" });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearPedido = async (req, res) => {
  try {
    const nuevoPedido = new Pedido({
      ...req.body,
      usuario_id: req.user.id,
    });
    const guardado = await nuevoPedido.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarPedido = async (req, res) => {
  try {
    const actualizado = await Pedido.findOneAndUpdate(
      { _id: req.params.id, usuario_id: req.user.id },
      req.body,
      { new: true }
    );
    if (!actualizado)
      return res.status(404).json({ message: "Pedido no encontrado" });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarPedido = async (req, res) => {
  try {
    const eliminado = await Pedido.findOneAndDelete({
      _id: req.params.id,
      usuario_id: req.user.id,
    });
    if (!eliminado)
      return res.status(404).json({ message: "Pedido no encontrado" });
    res.json({ message: "Pedido eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
