import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { LoginUseCase } from '../../application/use-cases/auth/LoginUseCase';
import { PostgreSQLUsuarioRepository } from '../../infrastructure/database/postgresql/PostgreSQLUsuarioRepository';
import { validateBody } from '../middleware/validate';
import { loginSchema } from '../schemas/authSchema';

const authRouter = Router();

const usuarioRepository = new PostgreSQLUsuarioRepository();
const loginUseCase = new LoginUseCase(usuarioRepository);
const authController = new AuthController(loginUseCase);

authRouter.post('/login', validateBody(loginSchema), (req, res) => authController.login(req, res));

export default authRouter;
