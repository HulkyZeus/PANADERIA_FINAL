// models/Pedido.js
import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  productos: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model("Pedido", pedidoSchema);
