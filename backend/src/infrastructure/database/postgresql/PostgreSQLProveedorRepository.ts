import { IProveedorRepository } from "../../../domain/repositories/IProveedorRepository";
import { Proveedor } from "../../../domain/entities/Proveedor";
import { db } from './connection'; // Importar la conexión de la base de datos

export class PostgreSQLProveedorRepository implements IProveedorRepository {
    async obtenerTodos(): Promise<Proveedor[]> {
        try {
            const { rows } = await db.query('SELECT * FROM proveedor');
            return rows as Proveedor[];
        } catch (error) {
            throw new Error('Error al obtener todos los proveedores: ' + (error as Error).message);
        }
    }

    async obtenerListaProveedores(): Promise<{ id: number; nombre: string; }[]> {
        try {
            const { rows } = await db.query(`
                SELECT 
                    id,
                    nombre
                FROM 
                    proveedor;
            `);
            return rows as { id: number; nombre: string; }[];
        } catch (error) {
            throw new Error('Error al obtener la lista de proveedores: ' + (error as Error).message);
        }
    }

    async obtenerPorId(id: number): Promise<Proveedor | null> {
        try {
            const { rows } = await db.query('SELECT * FROM proveedor WHERE id = $1', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error('Error al obtener el proveedor por ID: ' + (error as Error).message);
        }
    }

    async crear(proveedor: Proveedor): Promise<void> {
        try {
            const { nombre, contacto, telefono, email, direccion } = proveedor;
            await db.query(
                'INSERT INTO proveedor (nombre, contacto, telefono, email, direccion) VALUES ($1, $2, $3, $4, $5)',
                [nombre, contacto, telefono, email, direccion]
            );
        } catch (error) {
            throw new Error('Error al crear el proveedor: ' + (error as Error).message);
        }
    }

    async actualizar(proveedor: Proveedor): Promise<void> {
        try {
            const { id, nombre, contacto, telefono, email, direccion } = proveedor;
            await db.query(
                'UPDATE proveedor SET nombre = $1, contacto = $2, telefono = $3, email = $4, direccion = $5 WHERE id = $6',
                [nombre, contacto, telefono, email, direccion, id]
            );
        } catch (error) {
            throw new Error('Error al actualizar el proveedor: ' + (error as Error).message);
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            await db.query('DELETE FROM proveedor WHERE id = $1', [id]);
        } catch (error) {
            throw new Error('Error al eliminar el proveedor: ' + (error as Error).message);
        }
    } 

    async existeProveedorPorId(id: number): Promise<boolean> {
        const { rows } = await db.query('SELECT 1 FROM proveedor WHERE id = $1', [id]);
        return rows.length > 0;
    }
}
