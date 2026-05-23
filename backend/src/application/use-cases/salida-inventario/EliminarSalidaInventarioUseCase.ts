import { ISalidaInventarioRepository } from '../../../domain/repositories/ISalidaInventarioRepository';

export class EliminarSalidaInventarioUseCase {
    constructor(private salidaInventarioRepository: ISalidaInventarioRepository) {}

    async execute(id: number): Promise<void> {
        await this.salidaInventarioRepository.eliminar(id);
    }
}