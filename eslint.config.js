import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';

export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/build/**', '**/.next/**'],
  },

  {
    files: ['backend/**/*.ts'],
    extends: [
      ...tseslint.configs.recommended, // Reglas recomendadas de TS
    ],
    languageOptions: {
      parserOptions: {
        project: './backend/tsconfig.json', // Apesta al tsconfig del backend
      },
    },
    rules: {
      'no-console': 'warn', // En backend se usa console, pero es bueno vigilarlo
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  {
    files: ['frontend/**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommended,
    ],
    plugins: {
      'react': reactPlugin,
      'react-hooks': hooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: './frontend/tsconfig.json', // Apunta al tsconfig del frontend
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' }, // Autodetecta la versión de React
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Ya no es necesario con React 17+
      'react/prop-types': 'off', // Usamos interfaces de TypeScript en su lugar
    },
  }
);
