import { z } from 'zod';
import {
  AccountStatus,
  ClientRole,
  Email,
  Name,
  Phone,
  Username,
} from './accounts.js';
import { Id, NamedId, UtcTime } from './common.js';

export const SubRole = ClientRole.exclude(['client']);

export type SubRole = z.infer<typeof SubRole>;

const VehicleIds = z
  .array(Id)
  .max(5000)
  .refine((ids) => new Set(ids).size === ids.length);

const listOrAll = (value: {
  allVehicles: boolean;
  vehicleIds: string[];
}): boolean => !value.allVehicles || value.vehicleIds.length === 0;

export const SubAccount = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  role: SubRole,
  status: AccountStatus,
  allVehicles: z.boolean(),
  vehicleIds: z.array(z.string()),
  managedBy: NamedId.nullable(),
  lastSignInAt: UtcTime.nullable(),
  createdAt: UtcTime,
});

export type SubAccount = z.infer<typeof SubAccount>;

export const SubAccounts = z.array(SubAccount);

export type SubAccounts = z.infer<typeof SubAccounts>;

export const CreateSubAccountRequest = z
  .object({
    name: Name,
    username: Username,
    role: SubRole,
    email: Email.optional(),
    phone: Phone.optional(),
    allVehicles: z.boolean(),
    vehicleIds: VehicleIds,
  })
  .refine(listOrAll, {
    path: ['vehicleIds'],
  });

export type CreateSubAccountRequest = z.infer<typeof CreateSubAccountRequest>;

export const UpdateSubAccountRequest = z
  .object({
    name: Name,
    role: SubRole,
    email: Email.nullable(),
    phone: Phone.nullable(),
    allVehicles: z.boolean(),
    vehicleIds: VehicleIds,
  })
  .refine(listOrAll, {
    path: ['vehicleIds'],
  });

export type UpdateSubAccountRequest = z.infer<typeof UpdateSubAccountRequest>;
