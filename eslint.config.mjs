import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      // Add your TypeScript-specific rules here
    },
  },
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'),
];
