const base = require("../../jest.config.base.cjs");
module.exports = {
  ...base,
  rootDir: "../..",
  displayName: "pkg-sdk",
  testMatch: ["<rootDir>/packages/sdk/__tests__/**/*.ts"],
  collectCoverageFrom: ["packages/sdk/**/*.{ts,tsx}"],
};
