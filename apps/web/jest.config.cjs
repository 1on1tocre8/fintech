const base = require("../../jest.config.base.cjs");
module.exports = {
  ...base,
  rootDir: "../..",
  displayName: "web",
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", { tsconfig: "<rootDir>/apps/web/tsconfig.test.json" }],
  },
  collectCoverageFrom: ["apps/web/**/*.{ts,tsx}"],
  coverageThreshold: { global: { branches: 0, functions: 0, lines: 0, statements: 0 } },
};

