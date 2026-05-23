import { ICategoriaRepository } from "../../../domain/repositories/ICategoriaRepository";

export class EliminarCategoriaUseCase {
    constructor(private categoriaRepository: ICategoriaRepository) {}

    async execute(id: number): Promise<void> {
        // TODO: Implementar la lógica para validar y eliminar la categoría
        await this.categoriaRepository.eliminar(id);
    }
}