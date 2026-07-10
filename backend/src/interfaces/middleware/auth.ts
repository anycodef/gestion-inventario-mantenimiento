import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Autenticación y autorización — OWASP Top 10 2025 A01 (Broken Access Control)
 * y A07 (Authentication Failures).
 */
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const TOKEN_TTL = '8h';

export interface AuthPayload {
  sub: number;
  username: string;
  rol: string;
}

type AuthedRequest = Request & { user?: AuthPayload };

/** Firma un JWT con los datos del usuario autenticado. */
export function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

/** Exige un JWT válido en la cabecera Authorization: Bearer <token>. */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No autenticado' });
    return;
  }
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as AuthPayload;
    (req as AuthedRequest).user = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

/** Exige que el usuario autenticado tenga uno de los roles indicados. */
export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as AuthedRequest).user;
    if (!user || !roles.includes(user.rol)) {
      res.status(403).json({ message: 'No autorizado' });
      return;
    }
    next();
  };
}
