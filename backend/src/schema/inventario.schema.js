import { z } from "zod";

export const inventarioSchema = z.object({
  ingrediente: z.string({
    required_error: "Ingrediente es requerido",
  }),
  cantidad: z.number({
    required_error: "Cantidad es requerida",
  }),
  unidad: z.string({
    required_error: "Unidad es requerida",
  }),
});
