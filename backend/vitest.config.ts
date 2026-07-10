import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.ts'],
      // Excluir tests y bootstrap/infra no unitariamente testeable.
      exclude: ['src/**/*.test.ts', 'src/index.ts', 'src/infrastructure/**'],
    },
  },
});
