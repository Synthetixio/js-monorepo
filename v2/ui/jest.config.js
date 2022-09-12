const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  roots: ['<rootDir>/../../v2', '<rootDir>/../../v1'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  globalSetup: './tests/global.js',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/../../v{1,2}/**/*.test.{js,jsx,ts,tsx}'],
  collectCoverageFrom: [
    '<rootDir>/../../v{1,2}/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/*.{js,jsx,ts,tsx}',
    '!<rootDir>/../../v{1,2}/**/*.d.{ts,tsx}',
    '!<rootDir>/out/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/.next/**/*.{js,jsx,ts,tsx}',
  ],
};

module.exports = createJestConfig(customJestConfig);
