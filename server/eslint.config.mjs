// @ts-check

import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import jsdoc from 'eslint-plugin-jsdoc'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  stylistic.configs.recommended,
  [
    {
      files: ['**/*.ts'],
      plugins: {
        jsdoc: jsdoc
      },
      rules: {
        '@stylistic/comma-dangle': ['error', 'never'],
        '@stylistic/space-before-function-paren': ['error', 'always'],
        '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'jsdoc/require-description': 'warn'
      }
    }
  ]
)
