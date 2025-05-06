import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
    console.log("Error al conectar a la base de datos");
  }
};
