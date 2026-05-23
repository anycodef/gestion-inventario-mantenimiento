import { IProveedorRepository } from '../../../domain/repositories/IProveedorRepository';

export class EliminarProveedorUseCase {

    constructor(private proveedorRepository: IProveedorRepository) {}

    async execute(id: number): Promise<void> {

        await this.proveedorRepository.eliminar(id);
    }

}