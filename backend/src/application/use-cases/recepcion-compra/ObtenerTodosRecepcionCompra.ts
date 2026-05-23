import { IRecepcionCompraRepository } from "../../../domain/repositories/IRecepcionCompraRepository";
export class ObtenerTodosRecepcionCompraUseCase {
    constructor(private recepcionCompraRepository: IRecepcionCompraRepository) {}

    async execute(): Promise<Record<string, unknown>[]> {
        const recepcionesCompra = await this.recepcionCompraRepository.getAll();
        // 
        return recepcionesCompra;
    }
}