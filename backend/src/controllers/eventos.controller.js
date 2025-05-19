import Evento from "../models/eventos.model.js";

export const obtenerEventos = async (req, res) => {
  try {
    const eventos = await Evento.find({ usuario_id: req.user.id })
      .populate("usuario_id", "username"); // <-- Cambia aquí
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerEventosPorId = async (req, res) => {
  try {
    const evento = await Evento.findOne({
      _id: req.params.id,
      usuario_id: req.user.id,
    }).populate("usuario_id", "username"); // <-- Cambia aquí
    if (!evento)
      return res.status(404).json({ message: "Evento no encontrado" });
    res.json(evento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearEvento = async (req, res) => {
  try {
    const nuevoEvento = new Evento({
      ...req.body,
      usuario_id: req.user.id,
    });
    const guardado = await nuevoEvento.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarEvento = async (req, res) => {
  try {
    const actualizado = await Evento.findOneAndUpdate(
      { _id: req.params.id, usuario_id: req.user.id },
      req.body,
      { new: true }
    );
    if (!actualizado)
      return res.status(404).json({ message: "Evento no encontrado" });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarEvento = async (req, res) => {
  try {
    const eliminado = await Evento.findOneAndDelete({
      _id: req.params.id,
      usuario_id: req.user.id,
    });
    if (!eliminado)
      return res.status(404).json({ message: "Evento no encontrado" });
    res.json({ message: "Evento eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

