import { z } from "zod";

export const eventosSchema = z.object({
  usuario_id: z.string({
    required_error: "El ID del usuario es requerido",
  }),
  nombre_evento: z.string({
    required_error: "El nombre del evento es requerido",
  }),
  tipo_evento: z.enum(["Matrimonio", "Baby Shower", "Aniversario", "Cumpleaños", "Otros"], {
    required_error: "El tipo de evento es requerido",
  }),
  descripcion: z.string({
    required_error: "La descripción es requerida",
  }),
  direccion_evento: z.string({
    required_error: "La dirección del evento es requerida",
  }),
  fecha_evento: z.string({
    required_error: "La fecha del evento es requerida",
  }).refine((value) => !isNaN(Date.parse(value)), {
    message: "La fecha debe ser válida en formato ISO 8601",
  }),
  hora_evento: z.string({
    required_error: "La hora del evento es requerida",
  }).regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "La hora debe estar en formato HH:mm (24 horas)",
  }),
  cantidad_personas: z.number({
    required_error: "La cantidad de personas es requerida",
  }).int().positive("La cantidad de personas debe ser un número positivo"),
  productos: z.array(
    z.object({
      producto_id: z.string({
        required_error: "El ID del producto es requerido",
      }),
      cantidad: z.number({
        required_error: "La cantidad es requerida",
      }).int().positive("La cantidad debe ser un número positivo"),
    }),
    {
      required_error: "La lista de productos es requerida",
    }
  ).min(1, "Debe haber al menos un producto en el evento"),
});