import { describe, it, expect } from 'vitest';
import express from 'express';
import request from 'supertest';
import { authenticate, authorize, signToken } from './auth';

// Autenticación y autorización — OWASP A01/A07 (KAN-34).
describe('auth middleware', () => {
  const buildApp = () => {
    const app = express();
    app.get('/protegido', authenticate, (req, res) => {
      res.json({ ok: true, user: (req as express.Request & { user?: unknown }).user });
    });
    app.get('/solo-admin', authenticate, authorize('admin'), (_req, res) => {
      res.json({ ok: true });
    });
    return app;
  };

  it('rechaza sin cabecera Authorization (401)', async () => {
    const res = await request(buildApp()).get('/protegido');
    expect(res.status).toBe(401);
  });

  it('rechaza con un token inválido (401)', async () => {
    const res = await request(buildApp()).get('/protegido').set('Authorization', 'Bearer no-es-un-jwt');
    expect(res.status).toBe(401);
  });

  it('permite el acceso con un JWT válido', async () => {
    const token = signToken({ sub: 1, username: 'admin', rol: 'admin' });
    const res = await request(buildApp()).get('/protegido').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it('deniega (403) si el rol no está autorizado', async () => {
    const token = signToken({ sub: 2, username: 'operador', rol: 'operador' });
    const res = await request(buildApp()).get('/solo-admin').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  it('permite (200) si el rol está autorizado', async () => {
    const token = signToken({ sub: 1, username: 'admin', rol: 'admin' });
    const res = await request(buildApp()).get('/solo-admin').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
