import type { CustomerData, OwnerData, User } from '@/lib/types';
import type { IUser } from '@/models/User';

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
