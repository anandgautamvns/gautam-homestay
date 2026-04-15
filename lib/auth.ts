import { type NextRequest, NextResponse } from 'next/server';

import { type JwtPayload,verifyToken } from '@/lib/jwt';

import type { CustomerData, OwnerData, User } from '@/lib/types';
import type { IUser } from '@/models/User';

export const TOKEN_COOKIE = 'gh_token';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

// ─── Auth guard ──────────────────────────────────────────────────────────────

type AuthResult =
  | { unauthorized: false; payload: JwtPayload }
  | { unauthorized: true; response: NextResponse };

/** Extract and verify the JWT from the request cookie. */
export async function requireAuth(req: NextRequest): Promise<AuthResult> {
  const token = req.cookies.get(TOKEN_COOKIE)?.value;
  if (!token) {
    return {
      unauthorized: true,
      response: NextResponse.json({ message: 'Unauthorised' }, { status: 401 }),
    };
  }
  try {
    const payload = await verifyToken(token);
    return { unauthorized: false, payload };
  } catch {
    return {
      unauthorized: true,
      response: NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 }),
    };
  }
}

// ─── Cookie helpers ───────────────────────────────────────────────────────────

export function setTokenCookie(res: NextResponse, token: string): void {
  res.cookies.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });
}

export function clearTokenCookie(res: NextResponse): void {
  res.cookies.set(TOKEN_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

// ─── DTO helper ───────────────────────────────────────────────────────────────

/** Convert a Mongoose User document to the safe client-facing User DTO. */
export function toUserDTO(doc: IUser): User {
  const base = { id: String(doc._id), role: doc.role } as const;

  if (doc.role === 'customer') {
    const data: CustomerData = {
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      dob: doc.dob,
      address: doc.address,
    };
    return { ...base, data };
  }

  const data: OwnerData = {
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    propertyName: doc.propertyName ?? '',
    propertyAddress: doc.propertyAddress ?? '',
    rooms: doc.rooms ?? 1,
    gst: doc.gst,
  };
  return { ...base, data };
}
