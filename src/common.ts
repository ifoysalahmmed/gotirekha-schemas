import { z } from 'zod';

export const IMEI = z.string().regex(/^[0-9A-F]{6,20}$/);

export type IMEI = z.infer<typeof IMEI>;

export const UtcTime = z.iso.datetime();

export type UtcTime = z.infer<typeof UtcTime>;

export const Percent = z.int().min(0).max(100);

export type Percent = z.infer<typeof Percent>;

export const Protocol = z.enum(['gt06']);

export type Protocol = z.infer<typeof Protocol>;

export const Variant = z.enum(['s102a', 's06a', 'hst203t']);

export type Variant = z.infer<typeof Variant>;

export const Id = z.string().regex(/^[1-9][0-9]{0,17}$/);

export type Id = z.infer<typeof Id>;

export const PageQuery = z.object({
  page: z.coerce.number().int().min(1).max(1_000_000).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
});

export type PageQuery = z.infer<typeof PageQuery>;

export const paged = <T extends z.ZodType>(item: T) =>
  z.object({
    items: z.array(item),
    total: z.int().min(0),
  });
