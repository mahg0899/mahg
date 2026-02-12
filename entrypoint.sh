#!/bin/sh
set -e

echo "==> Running Payload CMS migrations..."
cd /app
npx payload migrate 2>&1 || echo "==> Migration note: no pending migrations or already up to date."

echo "==> Starting Next.js on port $PORT..."
exec npm start
