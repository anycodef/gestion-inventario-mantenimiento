import { describe, it, expect } from 'vitest';
import express from 'express';
import request from 'supertest';
import { securityHeaders } from './securityHeaders';

// Cabeceras de seguridad HTTP — OWASP A02 (KAN-23..29).
describe('securityHeaders', () => {
  const app = express();
  app.use(securityHeaders);
  app.get('/', (_req, res) => {
    res.send('ok');
  });

  it('oculta la cabecera X-Powered-By (KAN-28)', async () => {
    const res = await request(app).get('/');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });

  it('establece X-Frame-Options anti-clickjacking (KAN-23)', async () => {
    const res = await request(app).get('/');
    expect(res.headers['x-frame-options']).toBeDefined();
  });

  it('establece X-Content-Type-Options: nosniff (KAN-24)', async () => {
    const res = await request(app).get('/');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
  });

  it('establece Content-Security-Policy (KAN-25)', async () => {
    const res = await request(app).get('/');
    expect(res.headers['content-security-policy']).toBeDefined();
  });

  it('establece Permissions-Policy (KAN-26)', async () => {
    const res = await request(app).get('/');
    expect(res.headers['permissions-policy']).toContain('geolocation=()');
  });

  it('establece Cross-Origin-Embedder-Policy (KAN-27)', async () => {
    const res = await request(app).get('/');
    expect(res.headers['cross-origin-embedder-policy']).toBe('require-corp');
  });

  it('establece Cache-Control: no-store (KAN-29)', async () => {
    const res = await request(app).get('/');
    expect(res.headers['cache-control']).toBe('no-store');
  });
});
