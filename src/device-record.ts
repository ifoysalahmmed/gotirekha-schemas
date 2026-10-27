import { z } from 'zod';
import { IMEI, Percent, UtcTime } from './common.js';

const recordFields = {
  v: z.literal(1),
  imei: IMEI,
  receivedAt: UtcTime,
};

const powerFields = {
  ignition: z.boolean().nullable(),
  externalVoltage: z.number().nullable(),
  batteryLevel: Percent.nullable(),
  gsmSignal: Percent.nullable(),
};

export const PositionRecord = z.object({
  ...recordFields,
  kind: z.literal('position'),
  // Null when the bytes aren't a real date; the worker then uses receivedAt.
  deviceTime: UtcTime.nullable(),
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  speedKmh: z.number().min(0),
  course: z.int().min(0).max(359).nullable(),
  satellites: z.int().min(0).nullable(),
  gpsFixed: z.boolean(),
  ...powerFields,
});

export type PositionRecord = z.infer<typeof PositionRecord>;

// A GT06 heartbeat carries no time of its own, so only receivedAt orders it.
export const StatusRecord = z.object({
  ...recordFields,
  kind: z.literal('status'),
  ...powerFields,
});

export type StatusRecord = z.infer<typeof StatusRecord>;

export const RefusedRecord = z.object({
  ...recordFields,
  kind: z.literal('refused'),
  firstAt: UtcTime,
  port: z.int().min(1024).max(65535),
  ip: z.union([z.ipv4(), z.ipv6()]).nullable(),
  attempts: z.int().min(1),
});

export type RefusedRecord = z.infer<typeof RefusedRecord>;

export const DeviceRecord = z.discriminatedUnion('kind', [
  PositionRecord,
  StatusRecord,
  RefusedRecord,
]);

export type DeviceRecord = z.infer<typeof DeviceRecord>;
