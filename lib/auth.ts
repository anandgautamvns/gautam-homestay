import { type NextRequest, NextResponse } from 'next/server';

import { type JwtPayload, verifyToken } from '@/lib/jwt';

// Re-export shared constants & DTO helper (no `next/server` dependency)
export { COOKIE_MAX_AGE, TOKEN_COOKIE, toUserDTO } from '@/lib/auth-shared';

// ─── Auth guard ──────────────────────────────────────────────────────────────

type AuthResult =
  | { unauthorized: false; payload: JwtPayload }
  | { unauthorized: true; response: NextResponse };

/** Extract and verify the JWT from the request cookie. */
export async function requireAuth(req: NextRequest): Promise<AuthResult> {
  const token = req.cookies.get('gh_token')?.value;
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
  res.cookies.set('gh_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearTokenCookie(res: NextResponse): void {
  res.cookies.set('gh_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
