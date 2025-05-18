import { Router } from "express";
import {
    getProducts,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { isAdmin } from "../middlewares/adminPermiso.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

// Todas las rutas requieren autenticación
router.use(authRequired);

// Rutas que requieren rol de admin
router.post("/products", isAdmin, upload.single("image"), createProduct);
router.put("/products/:id", isAdmin, upload.single("image"), updateProduct);
router.delete("/products/:id", isAdmin, deleteProduct);

// Rutas que solo requieren autenticación
router.get("/products", getProducts);
router.get("/products/:category", getProductsByCategory);

export default router; 