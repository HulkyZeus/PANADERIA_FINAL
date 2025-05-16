import 'dotenv/config';
import express from "express";
import morgan from "morgan";
import { connectDB } from "./db.js";

import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import pedidosRoutes from "./routes/pedidos.routes.js";
import reviewRoutes from "./routes/review.routes.js"
import eventosRoutes from "./routes/eventos.routes.js"
import inventarioRoutes from "./routes/inventario.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";


const app = express();

// Configuración de CORS
const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5173"];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

//conexion a la base de datos
connectDB();

//Dependencias
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//Rutas
app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", pedidosRoutes);
app.use("/api", reviewRoutes);
app.use("/api", eventosRoutes);
app.use("/api", inventarioRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error("Error en el servidor:", err);
  res.status(500).json({ message: "Error interno del servidor" });
});


//Conexión al servidor
app.listen(4000);
console.log("Servidor corriendo en el puerto: ", 4000);

export default app;