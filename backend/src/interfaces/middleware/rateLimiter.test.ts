import { describe, it, expect } from 'vitest';
import express from 'express';
import request from 'supertest';
import { apiRateLimiter } from './rateLimiter';

// Límite de tasa — OWASP A02 (KAN-31).
describe('apiRateLimiter', () => {
  const app = express();
  app.use(apiRateLimiter);
  app.get('/', (_req, res) => {
    res.send('ok');
  });

  it('permite la petición dentro del límite', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  it('expone las cabeceras estándar de rate limit', async () => {
    const res = await request(app).get('/');
    expect(res.headers['ratelimit']).toBeDefined();
  });
});
