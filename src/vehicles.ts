import { z } from 'zod';
import { Name } from './accounts.js';
import { DateOnly, Percent, UtcTime } from './common.js';
import { ObjectType } from './objects.js';

export const OFFLINE_AFTER_S = 600;

export const DRIVING_FRESH_S = 60;

export const DEFAULT_SPEED_LIMIT_KMH = 80;

export const SpeedLimit = z.int().min(10).max(200);

export type SpeedLimit = z.infer<typeof SpeedLimit>;

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

export const DayDistance = z.object({
  date: DateOnly,
  distanceM: z.number().min(0),
});

export type DayDistance = z.infer<typeof DayDistance>;

export const VehicleState = z.object({
  position: VehiclePosition.nullable(),
  ignition: z.boolean().nullable(),
  externalVoltage: z.number().nullable(),
  batteryLevel: Percent.nullable(),
  gsmSignal: Percent.nullable(),
  motion: Motion.nullable(),
  lastSeenAt: UtcTime,
  dayDistance: DayDistance.nullable(),
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
  speedLimitKmh: SpeedLimit,
  odometerM: z.number().min(0),
  state: VehicleState.nullable(),
});

export type Vehicle = z.infer<typeof Vehicle>;

export const SpeedLimitRequest = z.object({
  speedLimitKmh: SpeedLimit,
});

export type SpeedLimitRequest = z.infer<typeof SpeedLimitRequest>;

export const Vehicles = z.array(Vehicle);

export type Vehicles = z.infer<typeof Vehicles>;

export const UpdateVehicleRequest = z.object({
  name: Name,
  driverName: Name.nullable(),
});

export type UpdateVehicleRequest = z.infer<typeof UpdateVehicleRequest>;

export const LiveState = VehicleState.extend({
  objectId: z.string(),
  odometerM: z.number().min(0),
});

export type LiveState = z.infer<typeof LiveState>;

export const LiveMessage = z.object({
  v: z.literal(1),
  states: z.array(LiveState).min(1),
});

export type LiveMessage = z.infer<typeof LiveMessage>;
