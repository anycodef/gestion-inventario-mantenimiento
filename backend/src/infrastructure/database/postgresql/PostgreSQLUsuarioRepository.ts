import { db } from './connection';
import { IUsuarioRepository } from '../../../domain/repositories/IUsuarioRepository';
import { Usuario } from '../../../domain/entities/Usuario';

export class PostgreSQLUsuarioRepository implements IUsuarioRepository {
  async obtenerPorUsername(username: string): Promise<Usuario | null> {
    const { rows } = await db.query(
      'SELECT id, username, password_hash, rol FROM usuarios WHERE username = $1',
      [username],
    );
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return {
      id: row.id,
      username: row.username,
      passwordHash: row.password_hash,
      rol: row.rol,
    };
  }
}
