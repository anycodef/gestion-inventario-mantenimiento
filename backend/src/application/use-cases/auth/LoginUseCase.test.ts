import { describe, it, expect } from 'vitest';
import bcrypt from 'bcryptjs';
import { LoginUseCase } from './LoginUseCase';
import { IUsuarioRepository } from '../../../domain/repositories/IUsuarioRepository';
import { Usuario } from '../../../domain/entities/Usuario';

const admin: Usuario = {
  id: 1,
  username: 'admin',
  passwordHash: bcrypt.hashSync('secreta', 10),
  rol: 'admin',
};

const repo = (user: Usuario | null): IUsuarioRepository => ({
  obtenerPorUsername: async () => user,
});

// LoginUseCase — OWASP A07 (KAN-34).
describe('LoginUseCase', () => {
  it('devuelve el usuario con credenciales correctas', async () => {
    const useCase = new LoginUseCase(repo(admin));
    const res = await useCase.execute('admin', 'secreta');
    expect(res?.username).toBe('admin');
  });

  it('devuelve null si la contraseña es incorrecta', async () => {
    const useCase = new LoginUseCase(repo(admin));
    expect(await useCase.execute('admin', 'incorrecta')).toBeNull();
  });

  it('devuelve null si el usuario no existe', async () => {
    const useCase = new LoginUseCase(repo(null));
    expect(await useCase.execute('fantasma', 'x')).toBeNull();
  });
});
