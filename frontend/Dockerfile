# pnpm installed
FROM node:18-alpine as pnpm-installed
WORKDIR /app

RUN wget -qO- https://unpkg.com/@pnpm/self-installer | node

# builder
FROM pnpm-installed as builder

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY tsconfig.json vite.config.ts index.html ./
COPY src ./src
COPY public ./public
RUN pnpm run build

# deps
FROM pnpm-installed as deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# runner
FROM svenstaro/miniserve

EXPOSE 8080

COPY --from=builder /app/dist ./dist

CMD ["./dist", "--index", "index.html"]
