import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

/**
 * Manejador de errores centralizado — OWASP Top 10 2025 A10
 * (Mishandling of Exceptional Conditions).
 *
 * Registra el error internamente (A09) y evita filtrar detalles internos
 * (stack traces, mensajes de excepción, SQL) al cliente: responde siempre un
 * mensaje genérico ante errores no controlados.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  logger.error({ err }, 'Error no controlado');
  if (res.headersSent) {
    return;
  }
  res.status(500).json({ message: 'Error interno del servidor' });
}
