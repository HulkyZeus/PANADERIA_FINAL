import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  cedula: {
    type: String,
    required: true,
    unique: true
  },
  celular: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model("Cliente", clienteSchema); 