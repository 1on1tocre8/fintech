const base = require("../../jest.config.base.cjs");
module.exports = {
  ...base,
  rootDir: "../..",
  displayName: "pkg-config",
  testMatch: ["<rootDir>/packages/config/__tests__/**/*.ts"],
  collectCoverageFrom: ["packages/config/**/*.{ts,tsx}"],
};
