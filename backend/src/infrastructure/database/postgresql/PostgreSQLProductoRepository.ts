import { IProductoRepository } from '../../../domain/repositories/IProductoRepository';
import { Producto } from '../../../domain/entities/Producto';
import { db } from './connection'; // Importar la conexión de la base de datos

export class PostgreSQLProductoRepository implements IProductoRepository {

    async obtenerTodos(): Promise<Producto[]> {
        try {
            const { rows } = await db.query('SELECT producto.*, categoria.nombre as nombrecategoria FROM producto JOIN categoria ON producto.categoriaid = categoria.id');
            return rows as Producto[];
        } catch (error) {
            throw new Error('Error al obtener los productos: ' + (error as Error).message);
        }
    }

    async obtenerLista(): Promise<{ id: number, nombre: string, precio: number }[]> {
        try {
            const { rows } = await db.query(`
                SELECT 
                    id,
                    nombre,
                    precio
                FROM 
                    producto;
            `);
            return rows as { id: number, nombre: string, precio: number }[];
        } catch (error) {
            throw new Error('Error al obtener la lista de productos: ' + (error as Error).message);
        }
    }

    async obtenerPorId(id: number): Promise<Producto | null> {
        try {
            const { rows } = await db.query('SELECT * FROM producto WHERE id = $1', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error('Error al obtener el producto por ID: ' + (error as Error).message);
        }
    }

    async crear(producto: Producto): Promise<void> {
        try {
            const { nombre, categoriaId, precio, descripcion, marca, modelo, nivelMaximo, nivelMinimo } = producto;
            await db.query(
                'INSERT INTO producto (nombre, categoriaid, precio, descripcion, marca, modelo, nivel_maximo, nivel_minimo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                [nombre, categoriaId, precio, descripcion, marca, modelo, nivelMaximo, nivelMinimo]
            );
        } catch (error) {
            throw new Error('Error al crear el producto: ' + (error as Error).message);
        }
    }

    async actualizar(producto: Producto): Promise<void> {
        try {
            const { id, nombre, categoriaId, precio, descripcion, marca, modelo, nivelMaximo, nivelMinimo } = producto;
            await db.query(
                'UPDATE producto SET nombre = $1, categoriaid = $2, precio = $3, descripcion = $4, marca = $5, modelo = $6, nivel_maximo = $7, nivel_minimo = $8 WHERE id = $9',
                [nombre, categoriaId, precio, descripcion, marca, modelo, nivelMaximo, nivelMinimo, id]
            );
        } catch (error) {
            throw new Error('Error al actualizar el producto: ' + (error as Error).message);
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            await db.query('DELETE FROM producto WHERE id = $1', [id]);
        } catch (error) {
            throw new Error('Error al eliminar el producto: ' + (error as Error).message);
        }
    }

    async obtenerPorCategoria(categoriaId: number): Promise<Producto[]> {
        try {
            const { rows } = await db.query('SELECT * FROM producto WHERE categoriaid = $1', [categoriaId]);
            return rows as Producto[];
        } catch (error) {
            throw new Error('Error al obtener los productos por categoría: ' + (error as Error).message);
        }
    }

    async obtenerInventario(): Promise<Producto[]> {
        try {
            const { rows } = await db.query(`
                SELECT 
                    producto.*,
                    categoria.nombre AS nombrecategoria
                FROM 
                    producto
                JOIN 
                    categoria ON producto.categoriaid = categoria.id
            `);
            return rows as Producto[];
        } catch (error) {
            throw new Error('Error al obtener el inventario de productos: ' + (error as Error).message);
        }
    }

    async obtenerProductosDebajoDelNivelMinimo(): Promise<Producto[]> {
        try {
            const { rows } = await db.query(`
                SELECT id, nombre, stock_actual FROM producto
                WHERE stock_actual < nivel_minimo;
            `);
            return rows as Producto[];
        } catch (error) {
            throw new Error('Error al obtener los productos debajo del nivel mínimo: ' + (error as Error).message);
        }
    }

    async obtenerProductosArribaDelNivelMaximo(): Promise<Producto[]> {
        try {
            const { rows } = await db.query(`
                SELECT id, nombre, stock_actual FROM producto
                WHERE stock_actual > nivel_maximo;
            `);
            return rows as Producto[];
        } catch (error) {
            throw new Error('Error al obtener los productos arriba del nivel máximo: ' + (error as Error).message);
        }
    }
}
