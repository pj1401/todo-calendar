// @ts-check

import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import jsdoc from 'eslint-plugin-jsdoc'

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  [
		{
			files: ["**/*.ts"],
			plugins: {
				jsdoc: jsdoc,
			},
			rules: {
				'jsdoc/require-description': 'warn'
			},
		},
	]
)
