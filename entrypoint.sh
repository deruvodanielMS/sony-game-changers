#!/bin/sh
set -e

DB_PATH="/data/db.sqlite"

echo "🔎 Checking database..."

if [ ! -f "$DB_PATH" ]; then
  echo "🆕 Database not found. Initializing..."

  npx prisma migrate deploy
  npx prisma db seed

  echo "✅ Database created and seeded."
else
  echo "📦 Database already exists. Skipping seed."
fi

echo "🚀 Starting Next.js"
exec yarn start
