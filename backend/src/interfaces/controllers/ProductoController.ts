import {Request, Response} from 'express'
import { CrearProductoUseCase } from '../../application/use-cases/producto/CrearProductoUseCase'
import { ObtenerTodosProductosUseCase } from '../../application/use-cases/producto/ObtenerTodosProductosUseCase'
import { ActualizarProductoUseCase } from '../../application/use-cases/producto/ActualizarProductoUseCase'
import { EliminarProductoUseCase } from '../../application/use-cases/producto/EliminarProductoUseCase'
import { ObtenerProductoPorIdUseCase } from '../../application/use-cases/producto/ObtenerProductoPorIdUseCase'
import { ObtenerListaProductosUseCase } from '../../application/use-cases/producto/ObtenerListaProductosUseCase'
import { ObtenerInventarioProductosUseCase } from '../../application/use-cases/producto/ObtenerInventarioProductosUseCase'
import { ObtenerProductosMaximosUseCase } from '../../application/use-cases/producto/ObtenerProductosMaximos'
import { ObtenerProductosMinimosUseCase } from '../../application/use-cases/producto/ObtenerProductosMinimosUseCase'
export class ProductoController {

    constructor(
        private crearProductoUseCase: CrearProductoUseCase,
        private obtenerTodosProductosUseCase: ObtenerTodosProductosUseCase,
        private obtenerProductoPorIdUseCase: ObtenerProductoPorIdUseCase,
        private actualizarProductoUseCase: ActualizarProductoUseCase,
        private eliminarProductoUseCase: EliminarProductoUseCase,
        private obtenerListaProductosUseCase: ObtenerListaProductosUseCase,
        private obtenerInventarioProductosUseCase: ObtenerInventarioProductosUseCase,
        private obtenerProductosMaximosUseCase: ObtenerProductosMaximosUseCase,
        private obtenerProductosMinimosUseCase: ObtenerProductosMinimosUseCase
    ) {}

    async crear(req: Request, res: Response): Promise<void> {
        const { nombre, categoriaId, precio, descripcion, marca, modelo, nivelMaximo, nivelMinimo } = req.body;
        try {
            await this.crearProductoUseCase.execute({
                id: 0,
                nombre,
                categoriaId,
                precio,
                descripcion,
                marca,
                modelo,
                nivelMaximo,
                nivelMinimo
            });
            res.status(201).json({ message: 'Producto creado con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el producto: ' + (error as Error).message });
        }
    }
    async obtenerlista(req: Request, res: Response): Promise<void> {
        try {
            const productos = await this.obtenerListaProductosUseCase.execute();
            res.json(productos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos: ' + (error as Error).message });
        }
    }

    async obtenerTodosProductos(req: Request, res: Response): Promise<void> {
        try {
            const productos = await this.obtenerTodosProductosUseCase.execute();
            res.json(productos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos: ' + (error as Error).message });
        }
    }

    async obtenerPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const producto = await this.obtenerProductoPorIdUseCase.execute(parseInt(id));
            res.json(producto);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el producto por ID: ' + (error as Error).message });
        }
    }

    async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //Verificar que el producto exista
        const producto = await this.obtenerProductoPorIdUseCase.execute(parseInt(id));
        if (!producto) {
            res.status(404).json({ message: 'Producto no encontrado' });
            return;
        }

        const { nombre, categoriaId, precio, descripcion, marca, modelo, nivelMaximo, nivelMinimo } = req.body;
        try {
            await this.actualizarProductoUseCase.execute({
                id: parseInt(id),
                nombre,
                categoriaId,
                precio,
                descripcion,
                marca,
                modelo,
                nivelMaximo,
                nivelMinimo
            });
            res.status(200).json({ message: 'Producto actualizado con exito' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el producto: ' + (error as Error).message });
        }
    }

    async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //Verificar que el producto exista
        const producto = await this.obtenerProductoPorIdUseCase.execute(parseInt(id));
        if (!producto) {
            res.status(404).json({ message: 'Producto no encontrado' });
            return;
        }
        
        try {
            await this.eliminarProductoUseCase.execute(parseInt(id));
            res.status(200).json({ message: 'Producto eliminado con exito' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el producto: ' + (error as Error).message });
        }
    }

    async obtenerInventario(req: Request, res: Response): Promise<void> {
        try {
            const inventario = await this.obtenerInventarioProductosUseCase.execute();
            res.json(inventario);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el inventario de productos: ' + (error as Error).message });
        }
    }

    async obtenerMinimos(req: Request, res: Response): Promise<void> {
        try {
            const productosMinimos = await this.obtenerProductosMinimosUseCase.execute();
            res.json(productosMinimos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos minimos: ' + (error as Error).message });
        }
    }
    async obtenerMaximos(req: Request, res: Response): Promise<void> {
        try {
            const productosMaximos = await this.obtenerProductosMaximosUseCase.execute();
            res.json(productosMaximos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos minimos: ' + (error as Error).message });
        }
    }

}