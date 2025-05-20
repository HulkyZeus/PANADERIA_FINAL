import { z } from "zod";

export const pedidoSchema = z.object({
  cliente_id: z.string()
    .min(1, "La cédula del cliente es requerida"),
  metodo_pago: z.enum(['PSE', 'Tarjeta', 'Efectivo'], {
    required_error: "El método de pago es requerido",
  }),
  productos: z.array(z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    image: z.string().optional()
  })),
  total: z.number({
    required_error: "Total es requerido",
  }),
  estado: z.enum(['confirmado', 'completado', 'cancelado'], {
    required_error: "Estado es requerido",
  }),
  fecha: z.string().optional(),
});
