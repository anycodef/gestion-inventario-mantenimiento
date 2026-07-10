import { describe, it, expect } from 'vitest';
import express from 'express';
import request from 'supertest';
import { validateBody } from './validate';
import { crearProductoSchema } from '../schemas/productoSchema';

// Validación de entrada con Zod — OWASP A05/A06 (KAN-33).
describe('validateBody', () => {
  const app = express();
  app.use(express.json());
  app.post('/productos', validateBody(crearProductoSchema), (req, res) => {
    res.json(req.body);
  });

  it('acepta un body válido y continúa', async () => {
    const res = await request(app)
      .post('/productos')
      .send({ nombre: 'Taladro', categoriaId: 1, precio: 100, nivelMaximo: 50, nivelMinimo: 5 });
    expect(res.status).toBe(200);
    expect(res.body.nombre).toBe('Taladro');
  });

  it('rechaza un body inválido con 400 y errores estructurados por campo', async () => {
    const res = await request(app).post('/productos').send({ nombre: '' });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Datos de entrada inválidos');
    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors.length).toBeGreaterThan(0);
  });
});
