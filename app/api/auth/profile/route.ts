import { type NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth-options';
import { connectDB } from '@/lib/db';
import { toUserDTO } from '@/lib/auth';
import { User } from '@/models/User';

// Only these fields may be updated per role
const ALLOWED: Record<'customer' | 'owner', string[]> = {
  customer: ['name', 'phone', 'dob', 'address'],
  owner: ['name', 'phone', 'propertyName', 'propertyAddress', 'rooms', 'gst'],
};

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorised' }, { status: 401 });
  }

  try {
    await connectDB();

    const body = (await req.json()) as Record<string, unknown>;
    const role = session.user.role as 'customer' | 'owner';
    const allowedFields = ALLOWED[role] ?? [];

    const update: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (field in body) update[field] = body[field];
    }

    const doc = await User.findByIdAndUpdate(
      session.user.id,
      { $set: update },
      { new: true, runValidators: true },
    );
    if (!doc) return NextResponse.json({ message: 'User not found.' }, { status: 404 });

    return NextResponse.json(toUserDTO(doc));
  } catch (err) {
    console.error('[PATCH /api/auth/profile]', err);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
