import { Request, Response, NextFunction } from 'express';

/**
 * Manejador de errores centralizado — OWASP Top 10 2025 A10
 * (Mishandling of Exceptional Conditions).
 *
 * Evita filtrar detalles internos (stack traces, mensajes de excepción, SQL)
 * al cliente: responde siempre un mensaje genérico ante errores no controlados.
 * El registro estructurado del error se añade en KAN-35 (logging con pino).
 */
export function errorHandler(
  _err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // TODO(KAN-35): registrar el error internamente con logging estructurado (pino).
  if (res.headersSent) {
    return;
  }
  res.status(500).json({ message: 'Error interno del servidor' });
}
