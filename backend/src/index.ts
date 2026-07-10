import dotenv from 'dotenv';
dotenv.config();

// New Relic APM (KAN-38): se carga solo si hay licencia configurada.
// Sin NEW_RELIC_LICENSE_KEY el agente queda dormido y la app arranca normal.
if (process.env.NEW_RELIC_LICENSE_KEY) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('newrelic');
  } catch {
    // APM opcional: continuar sin instrumentación si el agente no está disponible.
  }
}
import express, { Request, Response } from 'express';
import cors from 'cors';
import { securityHeaders } from './interfaces/middleware/securityHeaders';
import { apiRateLimiter } from './interfaces/middleware/rateLimiter';
import { errorHandler } from './interfaces/middleware/errorHandler';
import { logger } from './interfaces/middleware/logger';
import pinoHttp from 'pino-http';
import productoRouter from './interfaces/routes/productoRoutes';
import ordenCompraRouter from './interfaces/routes/ordenCompraRoutes';
import proveedorRouter from './interfaces/routes/proveedorRoutes';
import recepcionRoutes from './interfaces/routes/recepcionCompraRoutes';
import bodyParser from 'body-parser';
import categoriaRouter from './interfaces/routes/categoriaRoutes';
import salidaInventarioRouter from './interfaces/routes/salidaInventarioRoutes';
import kardexRouter from './interfaces/routes/kardexRoutes';
import authRouter from './interfaces/routes/authRoutes';
import { authenticate } from './interfaces/middleware/auth';
import { db } from './infrastructure/database/postgresql/connection';
const app = express();
const port = 3001;

// Cabeceras de seguridad HTTP (KAN-23..29 / OWASP A02 Security Misconfiguration).
app.use(securityHeaders);

// Límite de tasa de peticiones (KAN-31 / A02).
app.use(apiRateLimiter);

// Logging estructurado de peticiones (KAN-35 / A09).
app.use(pinoHttp({ logger }));

// Configurar CORS para permitir peticiones desde el frontend
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',')
  : ['http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON
app.use(bodyParser.json());

// Rutas de autenticación (públicas): login (KAN-34 / A07).
app.use('/api/auth', authRouter);

// Registrar las rutas de negocio protegidas con autenticación (KAN-34 / A01).
app.use('/api/productos', authenticate, productoRouter);
app.use('/api/ordenes', authenticate, ordenCompraRouter);
app.use('/api/proveedores', authenticate, proveedorRouter);
app.use('/api/recepciones', authenticate, recepcionRoutes);
app.use('/api/categorias', authenticate, categoriaRouter);
app.use('/api/kardex', authenticate, kardexRouter);
app.use('/api/salidas', authenticate, salidaInventarioRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/test-connection', async (req, res) => { try { const result = await db.query('SELECT NOW()'); res.json({ message: 'Conexión exitosa', time: result.rows[0].now }); } catch { res.status(500).send('Error al conectar a la base de datos'); } });

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({ message: 'Ruta no encontrada' });
});

// Manejador de errores centralizado (KAN-32 / A10): no filtra detalles internos.
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Backend escuchando en el puerto ${port}`);
});
