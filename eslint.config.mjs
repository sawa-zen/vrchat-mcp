// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      'semi': ['error', 'never'],
      'eol-last': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'key-spacing': ['error', {
        beforeColon: false,
        afterColon: true,
      }],
      'comma-spacing': ['error', { before: false, after: true }],
      'object-shorthand': ['error', 'always'],
      'no-throw-literal': 'error',
    },
  },
  {
    ignores: ['dist/**'],
  }
)
