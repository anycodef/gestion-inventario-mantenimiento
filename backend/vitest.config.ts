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
      // Excluir tests y capa glue/bootstrap/infra no unitariamente testeable
      // (alineado con sonar.coverage.exclusions).
      exclude: [
        'src/**/*.test.ts',
        'src/index.ts',
        'src/infrastructure/**',
        'src/interfaces/controllers/**',
        'src/interfaces/routes/**',
      ],
    },
  },
});
