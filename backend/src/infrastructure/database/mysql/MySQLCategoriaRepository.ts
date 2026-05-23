import { ICategoriaRepository } from "../../../domain/repositories/ICategoriaRepository";
import { Categoria } from "../../../domain/entities/Categoria";
import { db } from './connection'; // Importar la conexión de la base de datos

export class MySQLCategoriaRepository  implements ICategoriaRepository {
    async obtenerTodas(): Promise<Categoria[]> {
        try {
            const [results] = await db.query('SELECT id, nombre FROM Categoria');
            return results as Categoria[];
        } catch (error) {
            throw new Error('Error al obtener todas las categorías: ' + (error as Error).message);
        }
    }
    async obtenerPorId(id: number): Promise<Categoria | null> {
        try {
            const [results] = await db.query('SELECT id,nombre,descripcion FROM Categoria WHERE id = ?', [id]);
            const categorias = results as Categoria[];
            return categorias.length > 0 ? categorias[0] : null;
        } catch (error) {
            throw new Error('Error al obtener la categoría por ID: ' + (error as Error).message);
        }
    }
    async crear(categoria: Categoria): Promise<void> {
        try {
            const { nombre, descripcion } = categoria;
            await db.execute(
                'INSERT INTO Categoria (nombre, descripcion) VALUES (?, ?)',
                [nombre, descripcion]
            );
        } catch (error) {
            throw new Error('Error al crear la categoría: ' + (error as Error).message);
        }
    }
    async actualizar(categoria: Categoria): Promise<void> {
        try {
            const { id, nombre, descripcion } = categoria;
            await db.execute(
                'UPDATE Categoria SET nombre = ?, descripcion = ? WHERE id = ?',
                [nombre, descripcion, id]
            );
        } catch (error) {
            throw new Error('Error al actualizar la categoría: ' + (error as Error).message);
        }
    }
    async eliminar(id: number): Promise<void> {
        try {
            await db.execute('DELETE FROM Categoria WHERE id = ?', [id]);
        } catch (error) {
            throw new Error('Error al eliminar la categoría: ' + (error as Error).message);
        }
    }
}