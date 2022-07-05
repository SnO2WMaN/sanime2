# pnpm installed
FROM node:18-alpine as pnpm-installed
WORKDIR /app

RUN wget -qO- https://unpkg.com/@pnpm/self-installer | node

# builder
FROM pnpm-installed as builder
ARG VITE_API_ENDPOINT

RUN apk --no-cache add gettext

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY .env.production.local.template ./
RUN envsubst < .env.production.local.template > .env.production.local

COPY \
  index.html \
  postcss.config.js \
  tailwind.config.js \
  tsconfig.json \
  vite.config.ts \
  ./
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
