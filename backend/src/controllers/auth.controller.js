import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

/**
 * Registro de usuario
 */
export const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        // Verificación de usuario existente
        const userFound = await User.findOne({ email });
        if (userFound) {
            return res.status(400).json(["The email is already in use"]);
        }

        // Hash de contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Creación del nuevo usuario
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        const userSaved = await newUser.save();

        // Creación del token de acceso
        const token = await createAccessToken({ id: userSaved._id });

        // Configuración de la cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Solo en producción
            sameSite: "strict",
        });

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        console.error("Error en el registro:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Inicio de sesión
 */
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificación de usuario
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(400).json({ message: "User not found" });
        }

        // Comparación de contraseñas
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Creación del token
        const token = await createAccessToken({ id: userFound._id });

        // Configuración de la cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Solo en producción
            sameSite: "strict",
        });

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        console.error("Error en el inicio de sesión:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Cierre de sesión
 */
export const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Solo en producción
        sameSite: "strict",
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

/**
 * Perfil del usuario
 */
export const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id);

        if (!userFound) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        console.error("Error al obtener el perfil:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Verificación de token
 */
export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        jwt.verify(token, TOKEN_SECRET, async (err, user) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const userFound = await User.findById(user.id);
            if (!userFound) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            return res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
            });
        });
    } catch (error) {
        console.error("Error al verificar el token:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};