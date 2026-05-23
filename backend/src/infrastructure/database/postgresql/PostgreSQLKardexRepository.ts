import { IKardexRepository } from "../../../domain/repositories/IKardexRepository";
import { Kardex } from "../../../domain/entities/Kardex";
import { db } from "./connection";

export class PostgreSQLKardexRepository implements IKardexRepository {

    async obtenerMovimientos(): Promise<Kardex[]> {
        try {
            const { rows } = await db.query('SELECT * FROM kardex');
            return rows as Kardex[];
        } catch (error) {
            throw new Error('Error al obtener los movimientos de Kardex: ' + (error as Error).message);
        }
    }

    async registrarMovimiento(_kardex: Kardex): Promise<void> {
        //TODO
    }

}
