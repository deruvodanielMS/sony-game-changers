#!/bin/sh
set -e

echo "🔎 Running migrations..."
npx prisma migrate deploy

echo "🔁 Running seed scripts..."
npx prisma db seed

echo "🚀 Starting Next.js"
exec yarn start
