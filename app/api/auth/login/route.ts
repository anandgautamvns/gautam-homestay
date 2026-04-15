import { type NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';

import { setTokenCookie, toUserDTO } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { signToken } from '@/lib/jwt';
import { User } from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = (await req.json()) as {
      email: string;
      password: string;
      role: 'customer' | 'owner';
    };

    if (!email || !password || !role) {
      return NextResponse.json({ message: 'Missing credentials.' }, { status: 400 });
    }

    await connectDB();

    const doc = await User.findOne({ email: email.toLowerCase(), role });
    if (!doc) {
      return NextResponse.json(
        { message: 'Invalid email, password, or account type.' },
        { status: 401 },
      );
    }

    const match = await bcrypt.compare(password, doc.password);
    if (!match) {
      return NextResponse.json(
        { message: 'Invalid email, password, or account type.' },
        { status: 401 },
      );
    }

    const token = await signToken({ userId: String(doc._id), role: doc.role });
    const res = NextResponse.json(toUserDTO(doc));
    setTokenCookie(res, token);
    return res;
  } catch (err) {
    console.error('[POST /api/auth/login]', err);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
