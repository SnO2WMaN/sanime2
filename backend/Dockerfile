# pnpm installed
FROM node:16-alpine as pnpm-installed
WORKDIR /app

RUN wget -qO- https://unpkg.com/@pnpm/self-installer | node

# builder
FROM pnpm-installed as builder

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src
RUN pnpm run build

# deps
FROM pnpm-installed as deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# runner
FROM gcr.io/distroless/nodejs:16

EXPOSE 4000

COPY package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules

CMD ["./dist/index.js"]
