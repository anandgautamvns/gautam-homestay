import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Strategy as GoogleStrategy,type VerifyCallback } from 'passport-google-oauth20';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import { type IUser,User } from '../models/User';

// ─── Serialize / Deserialize (for session-based flows e.g. Google OAuth) ─────

passport.serializeUser((user, done) => {
  const u = user as IUser;
  done(null, { id: String(u._id), role: u.role });
});

passport.deserializeUser(async (data: { id: string; role: string }, done) => {
  try {
    const user = await User.findById(data.id);
    done(null, user ?? false);
  } catch (err) {
    done(err);
  }
});

// ─── Local strategy (email + password) ───────────────────────────────────────

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const role = (req.body as { role?: string }).role ?? 'customer';
        const user = await User.findOne({ email: email.toLowerCase().trim(), role });
        if (!user) return done(null, false, { message: 'No account found with that email' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return done(null, false, { message: 'Incorrect password' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

// ─── JWT strategy (reads gh_token cookie, for protected API routes) ──────────

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => (req?.cookies as Record<string, string> | undefined)?.['gh_token'] ?? null,
      ]),
      secretOrKey: process.env.JWT_SECRET ?? 'dev-fallback-secret-change-me',
    },
    async (payload: { userId: string; role: string }, done) => {
      try {
        const user = await User.findById(payload.userId);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

// ─── Google OAuth2 strategy ───────────────────────────────────────────────────

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL ?? '/api/auth/google/callback',
      },
      async (_accessToken, _refreshToken, profile, done: VerifyCallback) => {
        try {
          const email = profile.emails?.[0]?.value;
          if (!email) return done(new Error('Google did not return an email address'));

          // 1. Try to find by googleId
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            // 2. Link to existing customer account with same email
            user = await User.findOne({ email: email.toLowerCase(), role: 'customer' });
            if (user) {
              user.googleId = profile.id;
              await user.save();
            } else {
              // 3. Create new customer account
              user = await User.create({
                role: 'customer',
                name: profile.displayName,
                email: email.toLowerCase(),
                phone: '',
                password: await bcrypt.hash(Math.random().toString(36) + Date.now(), 12),
                googleId: profile.id,
              });
            }
          }

          return done(null, user);
        } catch (err) {
          return done(err as Error);
        }
      },
    ),
  );
}
