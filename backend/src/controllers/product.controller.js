import Product from "../models/product.model.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        let imageUrl = '';
        let imagePublicId = '';

        if (req.file) {
            const result = await uploadImage(req.file.path, {
                folder: `panaderia/${category}`
            });
            imageUrl = result.secure_url;
            imagePublicId = result.public_id;
            await fs.unlink(req.file.path);
        }

        const newProduct = new Product({
            name,
            description,
            price,
            category: category || 'bebidas',
            imageUrl,
            imagePublicId
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category } = req.body;
        let imageUrl = '';
        let imagePublicId = '';

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        if (req.file) {
            // Eliminar la imagen anterior
            if (product.imagePublicId) {
                await deleteImage(product.imagePublicId);
            }
            
            const result = await uploadImage(req.file.path, {
                folder: `panaderia/${category || product.category}`
            });
            imageUrl = result.secure_url;
            imagePublicId = result.public_id;
            await fs.unlink(req.file.path);
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                category,
                ...(imageUrl && { imageUrl }),
                ...(imagePublicId && { imagePublicId })
            },
            { new: true }
        );

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Eliminar la imagen de Cloudinary si existe
        if (product.imagePublicId) {
            await deleteImage(product.imagePublicId);
        }

        await Product.findByIdAndDelete(id);
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 