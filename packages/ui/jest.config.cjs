const base = require("../../jest.config.base.cjs");
module.exports = { ...base, rootDir: "../..", displayName: "pkg-ui", testMatch: ["<rootDir>/packages/ui/__tests__/**/*.ts"] };
