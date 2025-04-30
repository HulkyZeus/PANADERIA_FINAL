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
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", pedidosRoutes);
app.use("/api", reviewRoutes);
app.use("/api", eventosRoutes);
app.use("/api", inventarioRoutes);

connectDB();

app.listen(4000);
console.log("Servidor corriendo", 4000);
