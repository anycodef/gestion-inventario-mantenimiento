import { Usuario } from '../entities/Usuario';

export interface IUsuarioRepository {
  obtenerPorUsername(username: string): Promise<Usuario | null>;
}
