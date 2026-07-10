import { z } from 'zod';

/** Esquema de validación para el login (KAN-34 / A07). */
export const loginSchema = z.object({
  username: z.string().min(1, 'El usuario es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});
