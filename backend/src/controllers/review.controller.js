import Review from "../models/review.model.js";

export const obtenerReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Parámetros de paginación
    const reviews = await Review.find({ usuario_id: req.user.id })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Review.countDocuments({ usuario_id: req.user.id });

    res.json({
      reviews,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
    const { rating, description } = req.body;

    // Validación adicional
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "La puntuación debe estar entre 1 y 5" });
    }
    if (!description || description.trim() === "") {
      return res.status(400).json({ message: "La descripción es obligatoria" });
    }

    const nuevaReview = new Review({
      ...req.body,
      usuario_id: req.user.id,
    });
    const guardado = await nuevaReview.save();
    res.status(201).json(guardado);
  } catch (error) {
    console.error("Error al crear la reseña:", error);
    res.status(500).json({ message: "Error interno del servidor al crear la reseña" });
  }
};

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

export const obtenerTodasLasReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

router.get("/reviews/all", authRequired, isAdmin, obtenerTodasLasReviews);
