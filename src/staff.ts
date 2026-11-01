import { z } from 'zod';
import {
  AccountStatus,
  Email,
  ManagedStaffRole,
  Name,
  Phone,
  Username,
} from './accounts.js';
import { paged, UtcTime } from './common.js';

export const StaffAccount = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  role: ManagedStaffRole,
  status: AccountStatus,
  lastSignInAt: UtcTime.nullable(),
  createdAt: UtcTime,
});

export type StaffAccount = z.infer<typeof StaffAccount>;

export const StaffPage = paged(StaffAccount);

export type StaffPage = z.infer<typeof StaffPage>;

const NewStaff = z.object({
  name: Name,
  username: Username,
  phone: Phone.optional(),
});

export const CreateStaffRequest = z.discriminatedUnion('role', [
  NewStaff.extend({
    role: ManagedStaffRole.exclude(['installer']),
    email: Email,
  }),
  NewStaff.extend({
    role: ManagedStaffRole.extract(['installer']),
    email: Email.optional(),
  }),
]);

export type CreateStaffRequest = z.infer<typeof CreateStaffRequest>;

export const UpdateStaffRequest = z.object({
  name: Name,
  email: Email.nullable(),
  phone: Phone.nullable(),
});

export type UpdateStaffRequest = z.infer<typeof UpdateStaffRequest>;

export const IssuedPassword = z.object({
  password: z.string(),
});

export type IssuedPassword = z.infer<typeof IssuedPassword>;

export const CreatedStaff = z.object({
  account: StaffAccount,
  password: z.string(),
});

export type CreatedStaff = z.infer<typeof CreatedStaff>;
