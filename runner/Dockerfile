FROM oven/bun:latest

WORKDIR /app

COPY ./package.json .

RUN bun install

COPY . .

ENTRYPOINT NODE_ENV=prd bun ./src/index.ts