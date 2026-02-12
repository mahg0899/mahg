#!/bin/sh
set -e

cd /app

echo "==> Pushing database schema..."
npx tsx scripts/init-db.ts

echo "==> Starting Next.js on port $PORT..."
exec npm start
