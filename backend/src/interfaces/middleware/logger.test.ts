import { describe, it, expect } from 'vitest';
import { logger } from './logger';

// Logger estructurado — OWASP A09 (KAN-35).
describe('logger', () => {
  it('expone los métodos de logging estándar', () => {
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
    expect(typeof logger.warn).toBe('function');
  });
});
