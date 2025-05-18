import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  email: z.string().email("Debe ser un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.enum(["usuario", "admin"]).optional().default("usuario"),
});

// user.schema.js
export const updateUserSchema = z.object({
  username: z.string()
    .min(3, "Mínimo 3 caracteres")
    .max(30, "Máximo 30 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "Solo letras, números y _")
    .optional()
    .transform(val => val?.trim()),
    
  email: z.string()
    .email("Email inválido")
    .optional()
    .transform(val => val?.toLowerCase().trim())
}).refine(data => data.username || data.email, {
  message: "Debe proporcionar al menos un campo para actualizar",
  path: ["username"] // Para mostrar el error en el campo username
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