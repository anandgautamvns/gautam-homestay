import { jwtVerify, SignJWT } from 'jose';

// jose works in both Node.js API routes and the Edge middleware runtime.
const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? 'dev-fallback-secret-change-me');

export interface JwtPayload {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

export async function signToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, secret);
  return payload as unknown as JwtPayload;
}
