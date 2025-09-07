const base = require("../../jest.config.base.cjs");
module.exports = {
  ...base,
  rootDir: "../..",
  displayName: "api",
  collectCoverageFrom: ["apps/api/src/auth/__tests__/**/*.ts"],
  testMatch: ["<rootDir>/apps/api/**/*.spec.ts", "<rootDir>/apps/api/**/*.test.ts"],
  coverageThreshold: { global: { branches: 80, functions: 80, lines: 80, statements: 80 } },
};
