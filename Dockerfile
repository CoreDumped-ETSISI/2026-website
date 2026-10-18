# Etapa 1: Build inicial de la aplicación Vite + React desde GitHub
FROM debian:stable-slim AS builder
ARG REPO_URL=https://github.com/CoreDumped-ETSISI/2026-website.git
RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs npm git ca-certificates \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN git clone --depth 1 "$REPO_URL" . \
    && git rev-parse HEAD > /tmp/website-commit \
    && npm ci \
    && npm run build

# Etapa 2: Servidor web ligero sobre debian:stable-slim con auto-actualización
FROM debian:stable-slim

ENV TZ=Europe/Madrid \
    REPO_URL=https://github.com/CoreDumped-ETSISI/2026-website.git \
    CRON_SCHEDULE="59 23 * * *"

RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx-light cron git ca-certificates tzdata \
    && rm -rf /var/lib/apt/lists/* \
    && rm -f /var/www/html/index.nginx-debian.html

COPY --from=builder /app/dist /var/www/html
COPY --from=builder /tmp/website-commit /var/lib/website-commit

RUN cat <<'EOF' > /usr/local/bin/update-website.sh
#!/bin/sh
set -e

export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
export DEBIAN_FRONTEND=noninteractive

REPO_URL="${REPO_URL:-https://github.com/CoreDumped-ETSISI/2026-website.git}"
HASH_FILE="/var/lib/website-commit"
BUILD_DIR="/tmp/website-build"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Comprobando cambios en $REPO_URL..."

REMOTE_HASH=$(git ls-remote "$REPO_URL" HEAD | awk '{print $1}')
if [ -z "$REMOTE_HASH" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Error: no se pudo obtener el commit remoto."
    exit 1
fi

LOCAL_HASH=""
if [ -f "$HASH_FILE" ]; then
    LOCAL_HASH=$(cat "$HASH_FILE")
fi

if [ "$REMOTE_HASH" = "$LOCAL_HASH" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Sin cambios ($REMOTE_HASH)."
    exit 0
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Cambio detectado ($LOCAL_HASH -> $REMOTE_HASH). Descargando dependencias y compilando..."

cleanup() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Eliminando código fuente y herramientas de compilación..."
    cd /
    rm -rf "$BUILD_DIR" /root/.npm
    apt-get purge -y --auto-remove nodejs npm >/dev/null 2>&1 || true
    rm -rf /var/lib/apt/lists/*
}
trap cleanup EXIT

apt-get update
apt-get install -y --no-install-recommends nodejs npm

rm -rf "$BUILD_DIR"
git clone --depth 1 "$REPO_URL" "$BUILD_DIR"
cd "$BUILD_DIR"
npm ci
npm run build

rm -rf /var/www/html/*
cp -r "$BUILD_DIR"/dist/* /var/www/html/
echo "$REMOTE_HASH" > "$HASH_FILE"

nginx -s reload
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Sitio actualizado y recargado con éxito ($REMOTE_HASH)."
EOF

RUN cat <<'EOF' > /entrypoint.sh
#!/bin/sh
set -e

REPO_URL="${REPO_URL:-https://github.com/CoreDumped-ETSISI/2026-website.git}"
CRON_SCHEDULE="${CRON_SCHEDULE:-59 23 * * *}"
HASH_FILE="/var/lib/website-commit"

if [ -n "$TZ" ] && [ -f "/usr/share/zoneinfo/$TZ" ]; then
    ln -snf "/usr/share/zoneinfo/$TZ" /etc/localtime
    echo "$TZ" > /etc/timezone
fi

if [ ! -s "$HASH_FILE" ]; then
    git ls-remote "$REPO_URL" HEAD 2>/dev/null | awk '{print $1}' > "$HASH_FILE" || true
fi

cat <<CRON > /etc/cron.d/website-updater
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
REPO_URL=$REPO_URL
$CRON_SCHEDULE root /usr/local/bin/update-website.sh >> /proc/1/fd/1 2>>/proc/1/fd/2
CRON
chmod 0644 /etc/cron.d/website-updater

cron
exec nginx -g "daemon off;"
EOF

RUN chmod +x /usr/local/bin/update-website.sh /entrypoint.sh

EXPOSE 80
CMD ["/entrypoint.sh"]

