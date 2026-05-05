import bcrypt from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { connectDB } from '@/lib/db';
import { User } from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    // ─── Google OAuth2 ────────────────────────────────────────────────────────
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),

    // ─── Email + Password ─────────────────────────────────────────────────────
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        await connectDB();

        const role = (credentials.role as string) || 'customer';
        const user = await User.findOne({
          email: credentials.email.toLowerCase().trim(),
          role,
        });

        if (!user) throw new Error('No account found with that email');

        const ok = await bcrypt.compare(credentials.password as string, user.password);
        if (!ok) throw new Error('Incorrect password');

        return {
          id: String(user._id),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    // ─── Handle Google sign-in: upsert user in MongoDB ───────────────────────
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          await connectDB();
          const email = user.email!.toLowerCase();

          let dbUser = await User.findOne({ googleId: profile?.sub });

          if (!dbUser) {
            // Link Google ID to existing customer account with same email
            dbUser = await User.findOne({ email, role: 'customer' });
            if (dbUser) {
              dbUser.googleId = profile?.sub;
              await dbUser.save();
            } else {
              // Create new customer account via Google
              dbUser = await User.create({
                role: 'customer',
                name: user.name ?? 'Google User',
                email,
                phone: '',
                password: await bcrypt.hash(Math.random().toString(36) + Date.now(), 12),
                googleId: profile?.sub,
              });
            }
          }

          // Attach MongoDB _id and role to the NextAuth user object
          user.id = String(dbUser._id);
          (user as { id: string; role?: string }).role = dbUser.role;
        } catch (err) {
          console.error('[Google signIn]', err);
          return false;
        }
      }
      return true;
    },

    // ─── Persist id + role in the JWT ────────────────────────────────────────
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { id: string; role?: string }).role ?? 'customer';
      }
      return token;
    },

    // ─── Expose id + role on the client-side session ─────────────────────────
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },
  },

  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },

  session: { strategy: 'jwt' },
};
