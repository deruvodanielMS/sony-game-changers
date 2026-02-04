# ---------- Stage 1: Build ----------
FROM node:20-bullseye-slim AS builder

WORKDIR /app

# Dependencias (yarn)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Código fuente
COPY . .

# Prisma
RUN npx prisma generate

# Build Next.js
RUN yarn build


# ---------- Stage 2: Runtime ----------
FROM node:20-bullseye-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

# Archivos necesarios para correr
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma/schema.prisma ./prisma/schema.prisma

# Script de arranque
COPY entrypoint.sh /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
