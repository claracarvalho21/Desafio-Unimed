// jest.config.cjs
const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      isolatedModules: true,
      jsx: 'react-jsx',
    }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|vite))',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Agora o mock está na raiz: __mocks__/fileMock.js
    '\\.(jpg|jpeg|png|gif|webp|svg)$': path.resolve(__dirname, '__mocks__/fileMock.js'),
    '^@/(.*)$': path.resolve(__dirname, 'src/$1'),
  },
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};