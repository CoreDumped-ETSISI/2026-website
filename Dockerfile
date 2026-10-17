# Etapa 1: Build de la aplicación Vite + React
FROM debian:stable-slim AS builder
RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs npm ca-certificates \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY index.html vite.config.js ./
COPY src ./src
COPY assets ./assets
RUN npm run build

# Etapa 2: Servidor web ligero sobre debian:stable-slim
FROM debian:stable-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx-light \
    && rm -rf /var/lib/apt/lists/* \
    && rm -f /var/www/html/index.nginx-debian.html
COPY --from=builder /app/dist /var/www/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
