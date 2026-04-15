// Shared auth types used by both server (API routes / models) and client (RTK Query / AuthContext).

export type UserRole = 'customer' | 'owner';

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
  dob?: string;
  address?: string;
}

export interface OwnerData {
  name: string;
  email: string;
  phone: string;
  propertyName: string;
  propertyAddress: string;
  rooms: number;
  gst?: string;
}

/** Shape returned by every auth API endpoint — safe to send to the client (no password). */
export interface User {
  id: string;
  role: UserRole;
  data: CustomerData | OwnerData;
}
