// models/Pedido.js
import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true
  },
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  metodo_pago: {
    type: String,
    required: true,
    enum: ['PSE', 'Tarjeta', 'Efectivo']
  },
  productos: [{
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  total: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    required: true,
    enum: ['confirmado', 'completado', 'cancelado'],
    default: 'confirmado'
  },
  fecha: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model("Pedido", pedidoSchema);