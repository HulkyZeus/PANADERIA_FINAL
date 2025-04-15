import { z } from "zod";

export const reviewSchema = z.object({
    usuario_id: z.string({
        required_error: "Usuario ID es requerido",
    }),
    calificacion: z
        .number({
        required_error: "Calificacion es requerida",
        })
        .min(1, "La calificacion minima es 1")
        .max(5, "La calificacion maxima es 5"),
    comentario: z.string({
        required_error: "Comentario es requerido",
    }),
    producto_id: z.string({
        required_error: "Producto ID es requerido",
    }),
})


