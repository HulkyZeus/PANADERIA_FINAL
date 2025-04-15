import Inventario from "../models/inventario.model.js";

export const obtenerInventario = async (req, res) => {
  try {
    const inventario = await Inventario.find();
    res.json(inventario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerIngredientePorId = async (req, res) => {
  try {
    const ingrediente = await Inventario.findById(req.params.id);
    if (!ingrediente)
      return res.status(404).json({ message: "Ingrediente no encontrado" });
    res.json(ingrediente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearIngrediente = async (req, res) => {
  try {
    const nuevoIngrediente = new Inventario(req.body);
    const guardado = await nuevoIngrediente.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarIngrediente = async (req, res) => {
  try {
    const actualizado = await Inventario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!actualizado)
      return res.status(404).json({ message: "Ingrediente no encontrado" });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarIngrediente = async (req, res) => {
  try {
    const eliminado = await Inventario.findByIdAndDelete(req.params.id);
    if (!eliminado)
      return res.status(404).json({ message: "Ingrediente no encontrado" });
    res.json({ message: "Ingrediente eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
