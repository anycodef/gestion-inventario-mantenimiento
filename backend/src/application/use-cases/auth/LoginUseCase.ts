import bcrypt from 'bcryptjs';
import { IUsuarioRepository } from '../../../domain/repositories/IUsuarioRepository';
import { Usuario } from '../../../domain/entities/Usuario';

/**
 * Verifica las credenciales de un usuario (OWASP A07 Authentication Failures).
 * Devuelve el usuario si la contraseña es correcta, o null en caso contrario.
 */
export class LoginUseCase {
  constructor(private usuarioRepository: IUsuarioRepository) {}

  async execute(username: string, password: string): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.obtenerPorUsername(username);
    if (!usuario) {
      return null;
    }
    const passwordValida = await bcrypt.compare(password, usuario.passwordHash);
    if (!passwordValida) {
      return null;
    }
    return usuario;
  }
}
