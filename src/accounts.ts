import { z } from 'zod';

export const Role = z.enum([
  'super_user',
  'admin',
  'reseller',
  'installer',
  'client',
  'manager',
  'employee',
  'driver',
]);

export type Role = z.infer<typeof Role>;

export const StaffRole = Role.extract([
  'super_user',
  'admin',
  'reseller',
  'installer',
]);

export type StaffRole = z.infer<typeof StaffRole>;

export const ClientRole = Role.extract([
  'client',
  'manager',
  'employee',
  'driver',
]);

export type ClientRole = z.infer<typeof ClientRole>;

export const Phone = z
  .string()
  .overwrite((value) => value.replace(/[\s-]/g, ''))
  .regex(/^(?:\+?88)?01[3-9][0-9]{8}$/)
  .overwrite((value) => `+880${value.slice(-10)}`);

export type Phone = z.infer<typeof Phone>;

export const Username = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9][a-z0-9._-]{2,31}$/)
  .refine((value) => !/^[0-9]+$/.test(value))
  .refine((value) => !Phone.safeParse(value).success);

export type Username = z.infer<typeof Username>;

export const Email = z
  .string()
  .trim()
  .toLowerCase()
  .max(254)
  .regex(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);

export type Email = z.infer<typeof Email>;

export const Password = z.string().min(8).max(128);

export type Password = z.infer<typeof Password>;
