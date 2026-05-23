import { IDetalleCompraRepository } from "../../../domain/repositories/IDetalleCompraRepository";
import { DetalleCompra } from "../../../domain/entities/DetalleCompra";

export class MySQLDetalleCompraRepository implements IDetalleCompraRepository {
    async obtenerDetallesPorOrden(_ordenCompraId: number): Promise<DetalleCompra[]> {
        //TODO
        return [];
    }

    async agregarDetalle(_detalleCompra: DetalleCompra): Promise<void> {
        //TODO
    }

    async eliminarPorOrden(_ordenCompraId: number): Promise<void> {
        //TODO
    }
}