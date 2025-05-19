import Review from "../models/review.model.js";

// Crear una nueva reseña
export const crearReview = async (req, res) => {
  try {
      // Solo verifica autenticacion, no el rol
      if (!req.user || !req.user.id) {
          return res.status(401).json({ message: 'Debes iniciar sesión' });
      }

      const { rating, description } = req.body;

      // Validación básica
      if (!rating || !description) {
          return res.status(400).json({ 
              message: 'Faltan campos requeridos',
              required: ['rating', 'description']
          });
      }

      const nuevaReview = await Review.create({
          name: req.user.name,
          rating,
          description,
          usuario_id: req.user.id
      });

      // Populate virtual para mostrar info del usuario
      const reviewConUsuario = await Review.findById(nuevaReview._id)
          .populate('usuario_id', 'name email');

      return res.status(201).json({
          message: 'Reseña creada exitosamente',
          review: reviewConUsuario
      });
      res.status(201).json(nuevaReview);

  } catch (error) {
      console.error('Error al crear reseña:', error);
      
      // Manejo específico de errores de validación
      if (error.name === 'ValidationError') {
          return res.status(400).json({
              message: 'Error de validación',
              errors: Object.values(error.errors).map(e => e.message)
          });
      }
      
      return res.status(500).json({ 
          message: 'Error al guardar la reseña',
          error: error.message 
      });
  }
};

// Obtener todas las reseñas
export const obtenerReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("usuario_id", "name email"); // Opcional: incluir datos del usuario
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reseñas", error: error.message });
  }
};



// Obtener una reseña por ID
export const obtenerReviewPorId = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate("usuario_id", "name email");
    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la reseña", error: error.message });
  }
};

// Actualizar una reseña
export const actualizarReview = async (req, res) => {
  try {
    const { rating, description } = req.body;

    const reviewActualizada = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, description },
      { new: true }
    );

    if (!reviewActualizada) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    res.json({ message: "Reseña actualizada correctamente", review: reviewActualizada });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la reseña", error: error.message });
  }
};

// Eliminar una reseña
export const eliminarReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    res.json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reseña", error: error.message });
  }
};

//Obtener todas las reseñas de un usuario
export const obtenerTodasLasReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("usuario_id", "name email");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener todas las reseñas", error: error.message });
  }
};