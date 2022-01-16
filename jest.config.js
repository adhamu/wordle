module.exports = {
  ...require('@adhamu/zero/jest'),
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
}
