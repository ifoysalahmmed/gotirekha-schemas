import { z } from 'zod';

export const ActivityAction = z.enum([
  'account.create',
  'account.password_reset',
  'account.password_change',
]);

export type ActivityAction = z.infer<typeof ActivityAction>;

export const TargetType = z.enum(['account']);

export type TargetType = z.infer<typeof TargetType>;
