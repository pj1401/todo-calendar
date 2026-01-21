// @ts-check

import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import jsdoc from 'eslint-plugin-jsdoc'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  stylistic.configs.recommended,
  jsdoc.configs['flat/recommended'],
  [
    {
      files: ['**/*.js', '**/*.ts'],
      plugins: {
        jsdoc: jsdoc
      },
      rules: {
        '@stylistic/indent': ['error', 2],
        '@stylistic/comma-dangle': ['error', 'never'],
        '@stylistic/space-before-function-paren': ['error', 'always'],
        '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'jsdoc/require-description': 'warn',
        'jsdoc/tag-lines': ['error' | 'warn', 'any', { startLines: 1 }],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "error", { 
            "argsIgnorePattern": "^_", 
            "varsIgnorePattern": "^_",
            "caughtErrorsIgnorePattern": "^_"
          }
        ]
      },
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node
        }
      },
      ignores: ['dist/*']
    }
  ]
)
