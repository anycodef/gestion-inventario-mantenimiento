import { IOrdenCompraRepository } from "../../../domain/repositories/IOrdenCompraRepository";

export class EliminarOrdenCompraUseCase {
    constructor(private ordenCompraRepository: IOrdenCompraRepository) {}
    
    
    async execute(id: number): Promise<void> {
        const orden = await this.ordenCompraRepository.obtenerPorId(id);
        if (!orden) {
            throw new Error('La orden de compra no existe');
        }
        return this.ordenCompraRepository.eliminar(id);
    }
}