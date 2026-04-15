import { type NextRequest, NextResponse } from 'next/server';

import { TOKEN_COOKIE } from '@/lib/auth';
import { verifyToken } from '@/lib/jwt';

export const config = {
  matcher: ['/profile'],
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch {
    // Invalid / expired token — clear cookie and redirect to login
    const res = NextResponse.redirect(new URL('/auth/login', req.url));
    res.cookies.set(TOKEN_COOKIE, '', { maxAge: 0, path: '/' });
    return res;
  }
}
