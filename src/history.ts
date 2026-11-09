import { z } from 'zod';
import { UtcTime } from './common.js';

export const TRACK_MAX_DAYS = 7;

export const TrackQuery = z
  .object({
    from: UtcTime,
    to: UtcTime,
  })
  .refine((value) => Date.parse(value.to) > Date.parse(value.from), {
    path: ['to'],
  })
  .refine(
    (value) =>
      Date.parse(value.to) - Date.parse(value.from) <=
      TRACK_MAX_DAYS * 24 * 60 * 60 * 1000,
    {
      path: ['to'],
    },
  );

export type TrackQuery = z.infer<typeof TrackQuery>;

export const Track = z
  .object({
    times: z.array(z.int()),
    lats: z.array(z.number()),
    lons: z.array(z.number()),
    speeds: z.array(z.number()),
    courses: z.array(z.int().nullable()),
    ignition: z.array(z.boolean().nullable()),
    fixed: z.array(z.boolean()),
  })
  .refine((value) =>
    [
      value.lats,
      value.lons,
      value.speeds,
      value.courses,
      value.ignition,
      value.fixed,
    ].every((column) => column.length === value.times.length),
  );

export type Track = z.infer<typeof Track>;
