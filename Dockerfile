FROM node:24.8 AS builder
WORKDIR /app

RUN apt-get update; \
    apt-get install -y --no-install-recommends \
      build-essential curl ca-certificates pkg-config \
      libssl-dev libcurl4-gnutls-dev libexpat1-dev zlib1g-dev \
      libpcre2-dev gettext tcl; 

# Installing git from source to get >=2.49.0 which is required for the --revision flag
ARG GIT_VERSION=2.51.1
RUN curl -fsSLO https://mirrors.edge.kernel.org/pub/software/scm/git/git-${GIT_VERSION}.tar.gz; \
    tar -xzf git-${GIT_VERSION}.tar.gz; \
    cd git-${GIT_VERSION}; \
    make -j"$(nproc)" prefix=/usr/local; \
    make prefix=/usr/local install;

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm i -g pnpm@10 rust-just

COPY Justfile ./
RUN just prepare

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY ./ /app

RUN just build

FROM nginx:1.29.1-alpine
WORKDIR /app

COPY ./build/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /app/static
