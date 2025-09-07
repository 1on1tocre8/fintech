/* eslint-disable */
const { writeFileSync, mkdirSync } = require("fs");
const { resolve } = require("path");

async function loadAppModule() {
  try {
    // Prefer compiled JS (after pnpm --filter @ev/api build)
    return require("../dist/app.module.js").AppModule;
  } catch (_) {
    // Fallback: load TS sources with ts-node
    try {
      require("ts-node").register({
        transpileOnly: true,
        compilerOptions: { module: "CommonJS" },
      });
    } catch (e) {
      console.error(
        "ts-node not available; run build first or add ts-node as devDependency."
      );
      throw e;
    }
    return require("../src/app.module.ts").AppModule;
  }
}

(async () => {
  const { NestFactory } = require("@nestjs/core");
  const { SwaggerModule, DocumentBuilder } = require("@nestjs/swagger");
  const AppModule = await loadAppModule();

  const app = await NestFactory.create(AppModule, { logger: false });
  const cfg = new DocumentBuilder()
    .setTitle("EV API")
    .setVersion("0.1.0")
    .build();
  const doc = SwaggerModule.createDocument(app, cfg);

  const outDir = resolve(__dirname, "../../../docs/openapi");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "openapi.json"), JSON.stringify(doc, null, 2));
  await app.close();
  console.log("OpenAPI written to docs/openapi/openapi.json");
})();
