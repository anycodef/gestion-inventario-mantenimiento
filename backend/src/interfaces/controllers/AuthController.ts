import { Request, Response } from 'express';
import { LoginUseCase } from '../../application/use-cases/auth/LoginUseCase';
import { signToken } from '../middleware/auth';

export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const usuario = await this.loginUseCase.execute(username, password);
    if (!usuario) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }
    const token = signToken({ sub: usuario.id, username: usuario.username, rol: usuario.rol });
    res.json({
      token,
      usuario: { id: usuario.id, username: usuario.username, rol: usuario.rol },
    });
  }
}
