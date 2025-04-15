import { z } from "zod";

export const eventosSchema = z.object({
  nombre: z.string({
    required_error: "Nombre es requerido",
  }),
  fecha: z.string({
    required_error: "Fecha es requerida",
  }),
  hora: z.string({
    required_error: "Hora es requerida",
  }),
  lugar: z.string({
    required_error: "Lugar es requerido",
  }),
  descripcion: z.string({
    required_error: "Descripcion es requerida",
  }),
});
