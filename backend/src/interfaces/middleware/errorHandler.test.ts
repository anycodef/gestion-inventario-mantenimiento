import { describe, it, expect, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from './errorHandler';

// Manejo de errores centralizado — OWASP A10 (KAN-32).
describe('errorHandler', () => {
  const app = express();
  app.get('/boom', () => {
    throw new Error('detalle interno sensible: SELECT * FROM usuarios WHERE id=1');
  });
  app.use(errorHandler);

  it('responde 500 con un mensaje genérico', async () => {
    const res = await request(app).get('/boom');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Error interno del servidor' });
  });

  it('no filtra el detalle interno de la excepción al cliente', async () => {
    const res = await request(app).get('/boom');
    const payload = JSON.stringify(res.body);
    expect(payload).not.toContain('SELECT');
    expect(payload).not.toContain('sensible');
    expect(payload).not.toContain('usuarios');
  });

  it('no vuelve a responder si las cabeceras ya se enviaron', () => {
    const res = { headersSent: true, status: vi.fn(), json: vi.fn() } as unknown as Response;
    errorHandler(new Error('x'), {} as Request, res, (() => {}) as NextFunction);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
