import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth-options';
import { connectDB } from '@/lib/db';
import { toUserDTO } from '@/lib/auth';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorised' }, { status: 401 });
  }

  try {
    await connectDB();
    const doc = await User.findById(session.user.id);
    if (!doc) return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    return NextResponse.json(toUserDTO(doc));
  } catch (err) {
    console.error('[GET /api/auth/me]', err);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
