import { z } from "zod";

export const clienteSchema = z.object({
  name: z.string({
    required_error: "El nombre del cliente es requerido",
  }),
  address: z.string({
    required_error: "La dirección es requerida",
  }),
  cedula: z.string()
    .min(1, "La cédula es requerida"),
  celular: z.string()
    .min(1, "El número de celular es requerido")
    .max(10, "El número de celular no puede tener más de 10 dígitos")
    .regex(/^\d+$/, "El número de celular solo debe contener números"),
}); 