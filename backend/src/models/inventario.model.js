// models/Inventario.js
import mongoose from "mongoose";

const inventarioSchema = new mongoose.Schema({
  ingrediente: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  unidad: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Inventario", inventarioSchema);
