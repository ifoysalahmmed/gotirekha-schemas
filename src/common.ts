import { z } from 'zod';

export const IMEI = z.string().regex(/^[0-9A-F]{6,20}$/);

export type IMEI = z.infer<typeof IMEI>;

export const UtcTime = z.iso.datetime();

export type UtcTime = z.infer<typeof UtcTime>;

export const Percent = z.int().min(0).max(100);

export type Percent = z.infer<typeof Percent>;

export const Protocol = z.enum(['gt06']);

export type Protocol = z.infer<typeof Protocol>;

export const Variant = z.enum(['s102a', 's06a', 'et27']);

export type Variant = z.infer<typeof Variant>;
