import { IProductoRepository } from '../../../domain/repositories/IProductoRepository';

export class ActualizarStockProductoUseCase {
    constructor(private productoRepository: IProductoRepository) {}

    async execute(productoId: number, cantidad: number): Promise<void> {
        const producto = await this.productoRepository.obtenerPorId(productoId);
        if (!producto) {
            throw new Error(`El producto con id ${productoId} no existe.`);
        }
        await this.productoRepository.actualizarStock(productoId, cantidad);
    }
}
