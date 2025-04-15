import Review from "../models/review.model.js";

export const obtenerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ usuario_id: req.user.id }); // Solo sus reviews
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const obtenerReviewPorId = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      usuario_id: req.user.id,
    });
    if (!review)
      return res.status(404).json({ message: "Review no encontrada" });
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const crearReview = async (req, res) => {
  try {
    const nuevaReview = new Review({
      ...req.body,
      usuario_id: req.user.id,
    });
    const guardado = await nuevaReview.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const actualizarReview = async (req, res) => {
    try {
        const actualizado = await Review.findOneAndUpdate(
            { _id: req.params.id, usuario_id: req.user.id },
            req.body,
            { new: true }
        );
        if (!actualizado)
            return res.status(404).json({ message: "Review no encontrada" });
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const eliminarReview = async (req, res) => {
  try {
    const eliminado = await Review.findOneAndDelete({
      _id: req.params.id,
      usuario_id: req.user.id,
    });
    if (!eliminado)
      return res.status(404).json({ message: "Review no encontrada" });
    res.json({ message: "Review eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


