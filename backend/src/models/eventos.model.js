// models/eventos.js
import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  nombre_evento: {
    type: String,
    required: true,
  },
  tipo_evento: {
    type: String,
    enum: ["Matrimonio", "Baby Shower", "Aniversario", "Cumpleaños", "Otros"],
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  direccion_evento: {
    type: String,
    required: true,
  },
  fecha_evento: {
    type: Date,
    required: true,
  },
  hora_evento: {
    type: String,
    required: true,
  },
  cantidad_personas: {
    type: Number,
    required: true,
  },
  productos: [
    {
      producto_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Productos",
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
    },
  ],
},
{
    timestamps: true,
  }
);
export default mongoose.model("Eventos", eventoSchema);