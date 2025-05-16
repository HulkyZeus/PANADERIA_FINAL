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
        // Validación con Zod
        const validationResult = updateUserSchema.safeParse(req.body);
        
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Error de validación",
                errors: validationResult.error.errors.map(err => ({
                    field: err.path[0],
                    message: err.message
                }))
            });
        }

        const { username, email } = validationResult.data;
        const userId = req.user.id;

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
        const updateFields = { username, email };
        
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
        // Validación con Zod
        const validationResult = changePasswordSchema.safeParse(req.body);
        
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Error de validación",
                errors: validationResult.error.errors.map(err => ({
                    field: err.path[0],
                    message: err.message
                }))
            });
        }

        const { currentPassword, newPassword } = validationResult.data;
        const userId = req.user.id;

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
            return res.status(401).json({ 
                success: false,
                message: "Contraseña actual incorrecta" 
            });
        }

        // Hashear nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Actualizar contraseña
        user.password = hashedPassword;
        await user.save();

        // Generar nuevo token
        const newToken = await createAccessToken({ 
            id: user._id,
            role: user.role 
        });

        // Configurar cookie
        res.cookie("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
        });

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