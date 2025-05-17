import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { createAccessToken } from '../libs/jwt.js';
import { updateUserSchema, changePasswordSchema } from '../schema/user.schema.js';

/**
 * @desc    Obtener perfil del usuario actual
 * @route   GET /api/profile
 * @access  Privado
 */
export const getProfile = async (req, res) => {
  try {
    console.log('ID del usuario:', req.user.id); // Para depuración
    const user = await User.findById(req.user.id)
      .select('-password -refreshToken -__v')
      .lean();

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "Usuario no encontrado" 
      });
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error("Error en getProfile:", error);
    res.status(500).json({ 
      success: false,
      message: "Error al obtener el perfil del usuario" 
    });
  }
};

/**
 * @desc    Actualizar perfil del usuario
 * @route   PUT /api/profile
 * @access  Privado
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email } = req.body;

    // Verificar unicidad del email
    if (email) {
      const emailExists = await User.findOne({ 
        email, 
        _id: { $ne: userId } 
      });
      
      if (emailExists) {
        return res.status(409).json({ 
          success: false,
          message: "El correo electrónico ya está en uso" 
        });
      }
    }

    // Construir objeto de actualización
    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    
    // Actualizar usuario
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { 
        new: true,
        runValidators: true,
        select: '-password -refreshToken -__v' 
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ 
        success: false,
        message: "Usuario no encontrado" 
      });
    }

    res.json({
      success: true,
      message: "Perfil actualizado correctamente",
      data: updatedUser
    });

  } catch (error) {
    console.error("Error en updateProfile:", error);
    
    if (error.code === 11000) {
      return res.status(409).json({ 
        success: false,
        message: "El nombre de usuario ya está en uso" 
      });
    }

    res.status(500).json({ 
      success: false,
      message: "Error al actualizar el perfil" 
    });
  }
};

/**
 * @desc    Cambiar contraseña del usuario
 * @route   PUT /api/profile/password
 * @access  Privado
 */
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Obtener usuario
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    // Verificar contraseña actual
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Contraseña actual incorrecta"
      });
    }

    // Hash de nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar contraseña
    user.password = hashedPassword;
    await user.save();

    res.json({
      success: true,
      message: "Contraseña actualizada correctamente"
    });

  } catch (error) {
    console.error("Error en changePassword:", error);
    res.status(500).json({
      success: false,
      message: "Error al cambiar la contraseña"
    });
  }
};

/**
 * @desc    Actualizar datos del usuario actual
 * @route   PUT /api/users/me
 * @access  Privado (Usuario autenticado)
 */
export const updateSelf = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email } = req.body;

    // Verificar unicidad del email
    if (email) {
      const emailExists = await User.findOne({ 
        email, 
        _id: { $ne: userId } 
      });
      
      if (emailExists) {
        return res.status(409).json({ 
          success: false,
          message: "El correo electrónico ya está en uso" 
        });
      }
    }

    // Construir objeto de actualización
    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    
    // Actualizar usuario
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { 
        new: true,
        runValidators: true,
        select: '-password -refreshToken -__v' 
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ 
        success: false,
        message: "Usuario no encontrado" 
      });
    }

    res.json({
      success: true,
      message: "Datos actualizados correctamente",
      data: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt
      }
    });

  } catch (error) {
    console.error("Error en updateSelf:", error);
    
    if (error.code === 11000) {
      return res.status(409).json({ 
        success: false,
        message: "El nombre de usuario ya está en uso" 
      });
    }

    res.status(500).json({ 
      success: false,
      message: "Error al actualizar los datos" 
    });
  }
};