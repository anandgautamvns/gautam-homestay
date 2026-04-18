import bcrypt from 'bcryptjs';
import { type NextFunction, type Request, type Response, Router } from 'express';
import passport from 'passport';

import { COOKIE_MAX_AGE, TOKEN_COOKIE, toUserDTO } from '../lib/auth-shared';
import { signToken } from '../lib/jwt';
import { type IUser,User } from '../models/User';

const router = Router();

// Helper to set the JWT cookie on an Express response
function setJwtCookie(res: Response, token: string): void {
  res.cookie(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE * 1000, // express maxAge is milliseconds
  });
}

// ─── POST /api/auth/register ──────────────────────────────────────────────────

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { role = 'customer', name, email, phone, password, ...rest } = req.body as {
      role?: string;
      name: string;
      email: string;
      phone: string;
      password: string;
      [key: string]: unknown;
    };

    if (!name || !email || !phone || !password) {
      res.status(400).json({ message: 'name, email, phone and password are required' });
      return;
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim(), role });
    if (existing) {
      res.status(409).json({ message: 'An account with this email already exists for this role' });
      return;
    }

    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      role,
      name,
      email: email.toLowerCase().trim(),
      phone,
      password: hash,
      ...rest,
    });

    const token = await signToken({ userId: String(user._id), role: user.role });
    setJwtCookie(res, token);
    res.status(201).json({ user: toUserDTO(user) });
  } catch (err) {
    console.error('[register]', err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    { session: false },
    async (err: unknown, user: IUser | false, info: { message?: string }) => {
      if (err) return next(err);
      if (!user) {
        res.status(401).json({ message: info?.message ?? 'Invalid credentials' });
        return;
      }

      const token = await signToken({ userId: String(user._id), role: user.role });
      setJwtCookie(res, token);
      res.json({ user: toUserDTO(user) });
    },
  )(req, res, next);
});

// ─── POST /api/auth/logout ────────────────────────────────────────────────────

router.post('/logout', (req: Request, res: Response) => {
  req.logout(() => {
    res.clearCookie(TOKEN_COOKIE, { path: '/' }).json({ ok: true });
  });
});

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response) => {
    res.json({ user: toUserDTO(req.user as IUser) });
  },
);

// ─── PUT /api/auth/profile ────────────────────────────────────────────────────

router.put(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    try {
      const user = req.user as IUser;
      const { name, phone, dob, address, propertyName, propertyAddress, rooms, gst } =
        req.body as Partial<IUser>;

      if (name) user.name = name;
      if (phone) user.phone = phone;
      if (dob !== undefined) user.dob = dob;
      if (address !== undefined) user.address = address;
      if (propertyName !== undefined) user.propertyName = propertyName;
      if (propertyAddress !== undefined) user.propertyAddress = propertyAddress;
      if (rooms !== undefined) user.rooms = Number(rooms);
      if (gst !== undefined) user.gst = gst;

      await (user as IUser & { save(): Promise<IUser> }).save();
      res.json({ user: toUserDTO(user) });
    } catch (err) {
      console.error('[profile]', err);
      res.status(500).json({ message: 'Failed to update profile' });
    }
  },
);

// ─── GET /api/auth/google ─────────────────────────────────────────────────────

router.get('/google', (req: Request, res: Response, next: NextFunction) => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    res.status(501).json({ message: 'Google OAuth is not configured on this server' });
    return;
  }
  passport.authenticate('google', { scope: ['profile', 'email'], session: true })(req, res, next);
});

// ─── GET /api/auth/google/callback ───────────────────────────────────────────

router.get(
  '/google/callback',
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', {
      failureRedirect: '/auth/login?error=google_failed',
      session: true,
    })(req, res, next);
  },
  async (req: Request, res: Response) => {
    const user = req.user as IUser;
    const token = await signToken({ userId: String(user._id), role: user.role });
    setJwtCookie(res, token);
    res.redirect('/profile');
  },
);

export default router;
