import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
  transform: {
    '^.+\\.t(sx|s)?$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transformIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'jsdom',
};

export default config;
