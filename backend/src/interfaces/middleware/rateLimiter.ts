import rateLimit from 'express-rate-limit';

/**
 * Límite de tasa de peticiones (OWASP Top 10 2025 — A02 Security Misconfiguration).
 * Mitiga fuerza bruta y abuso/DoS limitando las solicitudes por IP.
 */
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // ventana de 15 minutos
  limit: 100, // máximo de solicitudes por IP y ventana
  standardHeaders: 'draft-7', // expone las cabeceras RateLimit estándar
  legacyHeaders: false,
  message: { message: 'Demasiadas solicitudes, intente de nuevo más tarde.' },
});
