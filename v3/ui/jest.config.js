require.resolve('babel-jest');

module.exports = {
  roots: ['<rootDir>/../../v3'],
  modulePaths: ['<rootDir>'],
  testMatch: [
    '<rootDir>/../../v3/libs/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/../../v3/ui/**/*.test.{js,jsx,ts,tsx}',
  ],
  testPathIgnorePatterns: ['<rootDir>/../../v3/subgraphs'],
  collectCoverageFrom: [
    '<rootDir>/../../v3/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/*.{js,jsx,ts,tsx}',
    '!<rootDir>/../../v3/**/*.d.{ts,tsx}',
    '!<rootDir>/../../v3/subgraphs',
  ],
};
