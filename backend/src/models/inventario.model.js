// models/Inventario.js
import mongoose from "mongoose";

const inventarioSchema = new mongoose.Schema({
  producto: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Inventario", inventarioSchema);
