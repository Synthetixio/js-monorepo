require.resolve('babel-jest');
require.resolve('jest-environment-jsdom');
module.exports = {
  roots: ['<rootDir>/../../v2', '<rootDir>/../../v1'],
  modulePaths: ['<rootDir>'],
  globalSetup: './tests/global.js',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/../../v{1,2}/**/*.test.{js,jsx,ts,tsx}'],
  collectCoverageFrom: [
    '<rootDir>/../../v{1,2}/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/*.{js,jsx,ts,tsx}',
    '!<rootDir>/../../v{1,2}/**/*.d.{ts,tsx}',
  ],
};
