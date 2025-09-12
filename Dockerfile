FROM node:24.8 AS builder
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm i -g pnpm@10

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY ./ /app

RUN pnpm tsc -b && pnpm vite build

FROM nginx:1.29.1-alpine
WORKDIR /app

COPY ./build/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /app/static
