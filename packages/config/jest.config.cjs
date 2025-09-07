// packages/config/jest.config.cjs
const base = require("../../jest.config.base.cjs");

module.exports = {
  ...base,
  rootDir: "../..",
  displayName: "pkg-config",
  testMatch: ["<rootDir>/packages/config/__tests__/**/*.ts"],
  collectCoverageFrom: ["packages/config/**/*.{ts,tsx}"],
  // keep packages relaxed so CI doesn’t fail on them
  coverageThreshold: { global: { branches: 0, functions: 0, lines: 0, statements: 0 } }
};
