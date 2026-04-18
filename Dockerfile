
FROM node:20-alpine AS base
WORKDIR /app

# keep telemetry off during build
ENV NEXT_TELEMETRY_DISABLED=1

# ─── Install all dependencies (dev + prod needed for tsx at runtime) ──────────
FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ─── Build Next.js ────────────────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# ─── Production runner ────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install ALL deps (tsx is needed at runtime to execute server.ts)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy Next.js build output and static assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy Express server source files (tsx compiles them on startup)
COPY server.ts ./
COPY tsconfig.json ./
COPY config/ ./config/
COPY routes/ ./routes/
COPY lib/ ./lib/
COPY models/ ./models/

EXPOSE 3000

CMD ["yarn", "start"]
