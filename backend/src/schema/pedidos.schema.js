import { z } from "zod";

export const pedidoSchema = z.object({
  productos: z.string({
    required_error: "Productos es requerido",
  }),
  total: z.number({
    required_error: "Total es requerido",
  }),
  estado: z.string({
    required_error: "Estado es requerido",
  }),
  fecha: z
    .string({
      required_error: "Fecha es requerida",
    })
    .datetime()
    .or(z.string()),
});
