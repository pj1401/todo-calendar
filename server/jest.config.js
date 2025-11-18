import { createDefaultPreset } from 'ts-jest'

const tsJestTransformCfg = createDefaultPreset().transform

/** @type {import("jest").Config} **/
export const testEnvironment = 'node'
export const transform = {
  ...tsJestTransformCfg,
  '^.+\\.tsx?$': [
    'ts-jest',
    {
      tsconfig: './test/tsconfig.json',
      useESM: true
    }
  ],
  '\\.[jt]sx?$': ['ts-jest', { useESM: true }]
}
export const moduleNameMapper = { '(.+)\\.js': '$1' }
export const extensionsToTreatAsEsm = ['.ts']
