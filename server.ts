import { config as dotenvConfig } from 'dotenv';
// Load .env.local first (Next.js convention), fall back to .env
dotenvConfig({ path: '.env.local' });
dotenvConfig();

import next from 'next';

import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import passport from 'passport';

import { connectDB } from './lib/db';
import authRouter from './routes/auth';

// Register Passport strategies (side-effect import)
import './config/passport';

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT ?? '3000', 10);

async function main(): Promise<void> {
  // Connect to MongoDB before starting the server
  await connectDB();

  const nextApp = next({ dev });
  const handle = nextApp.getRequestHandler();
  await nextApp.prepare();

  const server = express();

  // ─── Core middleware ────────────────────────────────────────────────────────
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser());

  // ─── Session (required for Google OAuth callback flow) ─────────────────────
  server.use(
    session({
      secret: process.env.SESSION_SECRET ?? 'dev-session-secret-change-me',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI!,
        ttl: 60 * 60 * 24 * 7, // 7 days
        autoRemove: 'native',
      }),
      cookie: {
        httpOnly: true,
        secure: !dev,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
      },
    }),
  );

  // ─── Passport ──────────────────────────────────────────────────────────────
  server.use(passport.initialize());
  server.use(passport.session());

  // ─── Auth routes (Express handles these before Next.js) ────────────────────
  server.use('/api/auth', authRouter);

  // ─── All other routes → Next.js ────────────────────────────────────────────
  server.all('/{*path}', (req, res) => {
    void handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port} [${dev ? 'development' : 'production'}]`);
  });
}

main().catch((err: unknown) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
