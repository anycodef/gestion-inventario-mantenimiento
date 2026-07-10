import helmet from 'helmet';
import { RequestHandler } from 'express';

/**
 * Cabeceras de seguridad HTTP (OWASP Top 10 2025 — A02 Security Misconfiguration).
 *
 * Resuelve los hallazgos del baseline DAST (OWASP ZAP):
 * - KAN-23 X-Frame-Options (anti-clickjacking)      -> helmet.frameguard
 * - KAN-24 X-Content-Type-Options: nosniff          -> helmet.noSniff
 * - KAN-25 Content-Security-Policy                  -> helmet.contentSecurityPolicy
 * - KAN-27 Cross-Origin-Embedder-Policy             -> helmet (habilitado)
 * - KAN-28 Ocultar X-Powered-By                     -> helmet.hidePoweredBy
 * - KAN-26 Permissions-Policy                       -> cabecera manual (helmet no la setea)
 * - KAN-29 Cache-Control: no-store                  -> cabecera manual
 */
export const securityHeaders: RequestHandler[] = [
  helmet({
    crossOriginEmbedderPolicy: true, // KAN-27
  }),
  (_req, res, next) => {
    res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()'); // KAN-26
    res.setHeader('Cache-Control', 'no-store'); // KAN-29
    next();
  },
];
