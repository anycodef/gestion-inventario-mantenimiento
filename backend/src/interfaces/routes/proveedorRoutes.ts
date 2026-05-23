import { Router } from 'express';
import { ProveedorController } from '../controllers/ProveedorController';
import { CrearProveedorUseCase } from '../../application/use-cases/proveedor/CrearProveedorUseCase';
import { ObtenerListaProveedorUseCase } from '../../application/use-cases/proveedor/ObtenerListaProveedoresUseCase';
import { MySQLProveedorRepository } from '../../infrastructure/database/mysql/MySQLProveedorRepository';
const proveedorRouter = Router();

//POSTGRESQL
// const proveedorRepository = new PostgreSQLProveedorRepository();


//MYSQL
const proveedorRepository = new MySQLProveedorRepository();

const crearProveedorUseCase = new CrearProveedorUseCase(proveedorRepository);
const obtenerListaProveedores = new ObtenerListaProveedorUseCase(proveedorRepository);
const proveedorController = new ProveedorController(
  crearProveedorUseCase,
  obtenerListaProveedores
);

proveedorRouter.post('/', (req, res) => proveedorController.crear(req, res));
proveedorRouter.get('/', (req, res) => proveedorController.obtenerTodosProveedores(req, res));
proveedorRouter.get('/info/:id', (req, res) => proveedorController.obtenerPorId(req, res));
proveedorRouter.put('/:id', (req, res) => proveedorController.actualizar(req, res));
proveedorRouter.delete('/:id', (req, res) => proveedorController.eliminar(req, res));

export default proveedorRouter;