import { IProductoRepository } from '../../../domain/repositories/IProductoRepository';

export class ActualizarStockProductoUseCase {
    constructor(private productoRepository: IProductoRepository) {}

    async execute(_productoID: number, _cantidad: number): Promise<void> {
        // TODO: Implementar lógica para actualizar el stock del producto
        // await this.productoRepository.actualizarStock(productoID, cantidad);
    }
}
