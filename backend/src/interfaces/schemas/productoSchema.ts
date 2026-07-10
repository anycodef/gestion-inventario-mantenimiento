import { z } from 'zod';

/** Esquema de validación para crear un producto (KAN-33 / A05-A06). */
export const crearProductoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  categoriaId: z.coerce.number().int().positive(),
  precio: z.coerce.number().nonnegative(),
  descripcion: z.string().optional(),
  marca: z.string().optional(),
  modelo: z.string().optional(),
  nivelMaximo: z.coerce.number().int().nonnegative(),
  nivelMinimo: z.coerce.number().int().nonnegative(),
});

/** Esquema de validación para actualizar un producto. */
export const actualizarProductoSchema = crearProductoSchema;
