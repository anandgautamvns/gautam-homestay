import { type NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';

import { connectDB } from '@/lib/db';
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
    await User.create({
      role,
      name,
      email: (email as string).toLowerCase().trim(),
      phone,
      password: hashed,
      ...rest,
    });

    // Return 201 with no body — client calls signIn('credentials') after this
    return new NextResponse(null, { status: 201 });
  } catch (err) {
    console.error('[POST /api/auth/register]', err);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
