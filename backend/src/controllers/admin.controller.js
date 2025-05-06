// controllers/admin.controller.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password");
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  const { username, email, role, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    // Verifica si ya existe un usuario con ese email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      role,
      password: hashedPassword,
    });
    const saved = await newUser.save();

    res.status(201).json({
      _id: saved._id,
      username: saved.username,
      email: saved.email,
      role: saved.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const updateData = { username, email };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updated = await User.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { 
        new: true,
        runValidators: true,
      }
    ).select('-password');

    if (!updated) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      _id: updated._id,
      username: updated.username,
      email: updated.email,
      role: updated.role,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar el rol de un usuario
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['admin', 'usuario'].includes(role)) {
      return res.status(400).json({ message: 'Rol no válido' });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
