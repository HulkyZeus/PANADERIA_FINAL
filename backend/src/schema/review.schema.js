import { z } from "zod";

export const reviewSchema = z.object({
  usuario_id: z.string({
    required_error: "El ID del usuario es requerido",
  }),
  calificacion: z
    .number({
      required_error: "La calificación es requerida",
    })
    .min(1, "La calificación debe ser al menos 1")
    .max(5, "La calificación no puede ser mayor a 5"),
  comentario: z.string({
    required_error: "El comentario es requerido",
  }),
  producto_id: z.string({
    required_error: "El ID del producto es requerido",
  }),
});