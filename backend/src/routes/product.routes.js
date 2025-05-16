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

// Rutas públicas
router.get("/products", getProducts);
router.get("/products/:category", getProductsByCategory);

// Rutas protegidas (requieren autenticación y ser admin)
router.use(authRequired, isAdmin);
router.post("/products", upload.single("image"), createProduct);
router.put("/products/:id", upload.single("image"), updateProduct);
router.delete("/products/:id", deleteProduct);

export default router; 