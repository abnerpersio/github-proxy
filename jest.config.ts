import type { Config } from 'jest';

export default async (): Promise<Config> => {
  return {
    clearMocks: true,
    verbose: false,
    coverageDirectory: 'coverage',
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['node_modules', '<rootDir>/src'],
  };
};
