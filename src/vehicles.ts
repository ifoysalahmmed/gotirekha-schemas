import { z } from 'zod';
import { Name } from './accounts.js';
import { DateOnly, Percent, UtcTime } from './common.js';
import { ObjectType } from './objects.js';

export const OFFLINE_AFTER_S = 600;

export const DRIVING_FRESH_S = 60;

export const Motion = z.enum(['driving', 'idle', 'parked']);

export type Motion = z.infer<typeof Motion>;

export const VehiclePosition = z.object({
  time: UtcTime,
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  speedKmh: z.number().min(0),
  course: z.int().min(0).max(359).nullable(),
  satellites: z.int().min(0).nullable(),
  gpsFixed: z.boolean(),
});

export type VehiclePosition = z.infer<typeof VehiclePosition>;

export const VehicleState = z.object({
  position: VehiclePosition.nullable(),
  ignition: z.boolean().nullable(),
  externalVoltage: z.number().nullable(),
  batteryLevel: Percent.nullable(),
  gsmSignal: Percent.nullable(),
  motion: Motion.nullable(),
  lastSeenAt: UtcTime,
});

export type VehicleState = z.infer<typeof VehicleState>;

export const Vehicle = z.object({
  id: z.string(),
  name: z.string(),
  plate: z.string().nullable(),
  type: ObjectType,
  driverName: z.string().nullable(),
  inactiveDate: DateOnly,
  expired: z.boolean(),
  state: VehicleState.nullable(),
});

export type Vehicle = z.infer<typeof Vehicle>;

export const Vehicles = z.array(Vehicle);

export type Vehicles = z.infer<typeof Vehicles>;

export const UpdateVehicleRequest = z.object({
  name: Name,
  driverName: Name.nullable(),
});

export type UpdateVehicleRequest = z.infer<typeof UpdateVehicleRequest>;

export const LiveState = VehicleState.extend({
  objectId: z.string(),
});

export type LiveState = z.infer<typeof LiveState>;

export const LiveMessage = z.object({
  v: z.literal(1),
  states: z.array(LiveState).min(1),
});

export type LiveMessage = z.infer<typeof LiveMessage>;
