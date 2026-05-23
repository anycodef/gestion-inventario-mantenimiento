import { IProveedorRepository } from "../../../domain/repositories/IProveedorRepository";

export class ObtenerListaProveedorUseCase {
    constructor(private proveedorRepository: IProveedorRepository) {}

    async execute(): Promise<{ id: number; nombre: string }[]> {
        return await this.proveedorRepository.obtenerListaProveedores();
    }
}