import { IDetalleSalidaRepository } from "../../../domain/repositories/IDetalleSalidaRepository";
import { DetalleSalida } from "../../../domain/entities/DetalleSalida";

export class MySQLDetalleSalidaRepository implements IDetalleSalidaRepository {
    async obtenerDetallesPorSalida(_salidaId: number): Promise<DetalleSalida[]> {
        //TODO
        return [];
    }
    async agregarDetalle(_detalleSalida: DetalleSalida): Promise<void> {
        //TODO
    }

    async eliminarPorSalida(_salidaId: number): Promise<void> {
        //TODO
    }
}