FROM node:20-alpine AS deps
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/
COPY apps/api/package.json apps/api/
COPY packages ./packages
RUN pnpm install --frozen-lockfile

FROM deps AS build
COPY . .
RUN pnpm -w apps/web build

FROM node:20-alpine AS run
RUN corepack enable
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=10000
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile
COPY --from=build /app/apps/web ./
EXPOSE 10000
CMD ["pnpm","--filter","apps/web","start","-p","10000"]
