import { z } from 'zod';

export const ActivityAction = z.enum([
  'account.create',
  'account.update',
  'account.disable',
  'account.enable',
  'account.delete',
  'account.password_reset',
  'account.password_change',
  'account.sms_password_reset',
  'account.vehicles_change',
  'client.create',
  'client.update',
  'client.disable',
  'client.enable',
  'client.delete',
  'client.account_cap_change',
  'client.reseller_change',
  'client.login_as',
  'client.login_as_end',
  'object.create',
  'object.update',
  'object.device_change',
  'object.device_move',
  'object.expiry_change',
  'object.disable',
  'object.enable',
  'object.speed_limit_change',
]);

export type ActivityAction = z.infer<typeof ActivityAction>;

export const TargetType = z.enum(['account', 'client', 'object']);

export type TargetType = z.infer<typeof TargetType>;
