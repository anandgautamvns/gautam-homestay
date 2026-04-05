
FROM node:20-alpine AS base
WORKDIR /app

# keep telemetry off during build
ENV NEXT_TELEMETRY_DISABLED=1

# dependencies (install dev deps too for build)
FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# build the app
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# runtime image (smaller)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# copy built files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

# ENV PORT=3000
# ENV HOSTNAME="0.0.0.0"
CMD ["yarn", "start"]
