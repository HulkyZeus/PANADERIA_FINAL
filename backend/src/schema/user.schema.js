import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  email: z.string().email("Debe ser un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.enum(["usuario", "admin"]).optional().default("usuario"),
});

// Esquema para actualización de perfil
export const updateUserSchema = z.object({
    username: z.string()
        .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
        .max(30, "El nombre de usuario no puede exceder 30 caracteres")
        .regex(/^[a-zA-Z0-9_]+$/, "Solo se permiten letras, números y guiones bajos")
        .optional(),
    
    email: z.string()
        .email("Correo electrónico no válido")
        .optional(),
});

// Esquema para cambio de contraseña
export const changePasswordSchema = z.object({
    currentPassword: z.string()
        .min(6, "La contraseña actual debe tener al menos 6 caracteres"),
    
    newPassword: z.string()
        .min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
    
    confirmPassword: z.string()
        .min(6, "La confirmación de contraseña debe tener al menos 6 caracteres")
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});