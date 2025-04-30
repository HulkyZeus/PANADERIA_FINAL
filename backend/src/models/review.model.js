import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    calificacion: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comentario: {
      type: String,
      required: true,
      trim: true,
    },
    producto_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", reviewSchema);