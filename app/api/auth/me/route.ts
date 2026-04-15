import { type NextRequest, NextResponse } from 'next/server';

import { requireAuth, toUserDTO } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.unauthorized) return auth.response;

  try {
    await connectDB();
    const doc = await User.findById(auth.payload.userId);
    if (!doc) return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    return NextResponse.json(toUserDTO(doc));
  } catch (err) {
    console.error('[GET /api/auth/me]', err);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
