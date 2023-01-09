require.resolve('babel-jest');
require.resolve('jest-environment-jsdom');

module.exports = {
  roots: ['<rootDir>/../../v3'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/../../v3/**/*.test.{js,jsx,ts,tsx}'],
  collectCoverageFrom: [
    '<rootDir>/../../v3/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/*.{js,jsx,ts,tsx}',
    '!<rootDir>/../../v3/**/*.d.{ts,tsx}',
  ],
};
