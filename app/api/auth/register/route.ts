import { type NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';

import { setTokenCookie, toUserDTO } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { signToken } from '@/lib/jwt';
import { User } from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const { role, password, name, email, phone, ...rest } = body as {
      role: 'customer' | 'owner';
      password: string;
      name: string;
      email: string;
      phone: string;
      [key: string]: unknown;
    };

    if (!role || !password || !name || !email || !phone) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }
    if (typeof password === 'string' && password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters.' },
        { status: 400 },
      );
    }
    if (!['customer', 'owner'].includes(role)) {
      return NextResponse.json({ message: 'Invalid role.' }, { status: 400 });
    }

    await connectDB();

    const exists = await User.findOne({ email: (email as string).toLowerCase(), role });
    if (exists) {
      return NextResponse.json(
        { message: 'An account with this email already exists for this role.' },
        { status: 409 },
      );
    }

    const hashed = await bcrypt.hash(password as string, 12);
    const doc = await User.create({ role, name, email, phone, password: hashed, ...rest });

    const token = await signToken({ userId: String(doc._id), role });
    const res = NextResponse.json(toUserDTO(doc), { status: 201 });
    setTokenCookie(res, token);
    return res;
  } catch (err) {
    console.error('[POST /api/auth/register]', err);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
