import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

export const getProfile = async (req, res) => {
  try {
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

export const updateSelf = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email } = req.body;
    console.log("Datos recibidos para actualizar:", { username, email });

    // Validación explícita
    if (!username || !email) {
      return res.status(400).json({
        success: false,
        message: "Faltan campos requeridos"
      });
    }

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

    const updateFields = { username, email };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { 
        new: true,
        runValidators: true
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

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Contraseña actual incorrecta"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

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