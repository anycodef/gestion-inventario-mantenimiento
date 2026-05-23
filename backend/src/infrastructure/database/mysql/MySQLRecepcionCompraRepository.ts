import { IRecepcionCompraRepository } from "../../../domain/repositories/IRecepcionCompraRepository";
import { RecepcionCompra } from "../../../domain/entities/RecepcionCompra";
import { db } from "./connection";

export class MySQLRecepcionCompraRepository implements IRecepcionCompraRepository {
    async getAll(): Promise<RecepcionCompra[]> {
        try {
            const [results] = await db.query('SELECT id, orden_compraid, fecha_recepcion, estado FROM Recepcion_Compra');
            return results as RecepcionCompra[];
        } catch (error) {
            throw new Error('Error al obtener todos las recepciones: ' + (error as Error).message);
        }
    }
}