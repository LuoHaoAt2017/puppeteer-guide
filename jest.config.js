module.exports = {
  preset: "jest-puppeteer",
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  rootDir: '.',
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  transform: {
    "\\.js$": 'babel-jest',
    "\\.ts$": 'ts-jest'
  },
  transformIgnorePatterns: [
    "/node_modules/",
  ]
};
