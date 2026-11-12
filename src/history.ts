import { z } from 'zod';
import { UtcTime } from './common.js';

export const TRACK_MAX_DAYS = 7;

export const IDLE_AFTER_S = 300;

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

const Latitude = z.number().min(-90).max(90);

const Longitude = z.number().min(-180).max(180);

export const HistoryPeriod = z.object({
  start: UtcTime,
  end: UtcTime.nullable(),
  lat: Latitude,
  lon: Longitude,
});

export type HistoryPeriod = z.infer<typeof HistoryPeriod>;

export const HistoryTrip = z.object({
  start: UtcTime,
  end: UtcTime.nullable(),
  distanceM: z.number().min(0),
  maxSpeedKmh: z.number().min(0),
});

export type HistoryTrip = z.infer<typeof HistoryTrip>;

export const AlarmType = z.enum([
  'overspeed',
  'ignition_on',
  'ignition_off',
  'power_cut',
  'low_battery',
  'sos',
  'zone_in',
  'zone_out',
  'excessive_idling',
  'vibration',
]);

export type AlarmType = z.infer<typeof AlarmType>;

export const HistoryAlarm = z.object({
  type: AlarmType,
  time: UtcTime,
  end: UtcTime.nullable(),
  lat: Latitude,
  lon: Longitude,
  speedKmh: z.number().min(0),
  value: z.number().nullable(),
  limitValue: z.number().nullable(),
});

export type HistoryAlarm = z.infer<typeof HistoryAlarm>;

export const ObjectHistory = z.object({
  track: Track,
  trips: z.array(HistoryTrip),
  idles: z.array(HistoryPeriod),
  parkings: z.array(HistoryPeriod),
  alarms: z.array(HistoryAlarm),
  speedLimitKmh: z.int(),
});

export type ObjectHistory = z.infer<typeof ObjectHistory>;
