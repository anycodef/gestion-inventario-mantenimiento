import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware de validación de entrada con Zod (OWASP Top 10 2025 — A05/A06).
 * Valida el body de la petición contra un esquema; si es inválido responde 400
 * con errores estructurados por campo (sin filtrar detalles internos).
 */
export function validateBody(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: 'Datos de entrada inválidos',
        errors: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });
      return;
    }
    req.body = result.data;
    next();
  };
}
