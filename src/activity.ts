import { z } from 'zod';

export const ActivityAction = z.enum([
  'account.create',
  'account.update',
  'account.disable',
  'account.enable',
  'account.delete',
  'account.password_reset',
  'account.password_change',
  'client.reseller_change',
]);

export type ActivityAction = z.infer<typeof ActivityAction>;

export const TargetType = z.enum(['account', 'client']);

export type TargetType = z.infer<typeof TargetType>;
