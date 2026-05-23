import { IProductoRepository } from '../../../domain/repositories/IProductoRepository';

export class CambiarEstadoProductoUseCase {
    constructor(private productoRepository: IProductoRepository) {}

    async execute(_productoID: number, _estado: string): Promise<void> {
        // TODO: Implementar lógica para cambiar el estado de un producto
        // await this.productoRepository.cambiarEstado(productoID, estado);
    }
}
