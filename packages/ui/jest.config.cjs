// packages/ui/jest.config.cjs
const base = require("../../jest.config.base.cjs");

module.exports = {
  ...base,
  rootDir: "../..",
  displayName: "pkg-ui",
  testMatch: ["<rootDir>/packages/ui/__tests__/**/*.ts"],
  collectCoverageFrom: ["packages/ui/**/*.{ts,tsx}"],
  coverageThreshold: { global: { branches: 0, functions: 0, lines: 0, statements: 0 } }
};
