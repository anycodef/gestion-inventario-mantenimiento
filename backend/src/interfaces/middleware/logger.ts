import pino from 'pino';

/**
 * Logger estructurado (OWASP Top 10 2025 — A09 Security Logging and Alerting Failures).
 *
 * Registra eventos de la aplicación en JSON. Redacta datos sensibles para no
 * filtrar credenciales en los logs. Silencioso bajo tests para no ensuciar la salida.
 */
export const logger = pino({
  level: process.env.VITEST ? 'silent' : process.env.LOG_LEVEL || 'info',
  redact: [
    'req.headers.authorization',
    'req.headers.cookie',
    'password',
    '*.password',
    'token',
    '*.token',
  ],
});
