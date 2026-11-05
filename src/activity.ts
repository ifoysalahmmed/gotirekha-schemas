import { z } from 'zod';

export const ActivityAction = z.enum([
  'account.create',
  'account.update',
  'account.disable',
  'account.enable',
  'account.delete',
  'account.password_reset',
  'account.password_change',
  'client.create',
  'client.update',
  'client.disable',
  'client.enable',
  'client.delete',
  'client.account_cap_change',
  'client.reseller_change',
  'object.create',
  'object.update',
  'object.device_change',
  'object.device_move',
  'object.expiry_change',
  'object.disable',
  'object.enable',
]);

export type ActivityAction = z.infer<typeof ActivityAction>;

export const TargetType = z.enum(['account', 'client', 'object']);

export type TargetType = z.infer<typeof TargetType>;
