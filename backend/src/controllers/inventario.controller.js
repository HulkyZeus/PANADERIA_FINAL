import Inventario from "../models/inventario.model.js";

export const obtenerInventario = async (req, res) => {
  try {
    const inventario = await Inventario.find();
    res.json(inventario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Inventario.findById(req.params.id);
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Inventario(req.body);
    const guardado = await nuevoProducto.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const actualizado = await Inventario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!actualizado)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const eliminado = await Inventario.findByIdAndDelete(req.params.id);
    if (!eliminado)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
