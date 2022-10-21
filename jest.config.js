require.resolve('babel-jest');
require.resolve('jest-environment-jsdom');

module.exports = {
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  globalSetup: '<rootDir>/jest.global.js',
  setupFilesAfterEnv: ['<rootDir>/v2/ui/tests/setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/**/*.test.{js,jsx,ts,tsx}'],
  collectCoverageFrom: ['<rootDir>/**/*.{js,jsx,ts,tsx}', '!<rootDir>/**/*.d.{ts,tsx}'],
};
