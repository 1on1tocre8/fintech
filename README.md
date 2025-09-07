# EV Financing Platform Monorepo

This monorepo houses the EV financing platform consisting of a NestJS API and a Next.js web application.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io)
- Docker & Docker Compose

### Development

Start infrastructure and applications:

```bash
pnpm install
pnpm dev:up
```

Stop services:

```bash
pnpm dev:down
```

Generate OpenAPI spec:

```bash
pnpm generate:openapi
```

Run tests:

```bash
pnpm test
```
