#!/bin/sh
set -e

cd /app

echo "==> Generating Payload CMS migrations if needed..."
npx payload migrate:create --name auto 2>&1 || echo "==> No new migrations to create."

echo "==> Running Payload CMS migrations..."
npx payload migrate 2>&1 || echo "==> Migration note: already up to date or no migrations found."

echo "==> Starting Next.js on port $PORT..."
exec npm start
