import { z } from 'zod';
import { Name } from './accounts.js';
import {
  DateOnly,
  Id,
  IMEI,
  NamedId,
  paged,
  PageQuery,
  UtcTime,
} from './common.js';

export const ObjectType = z.enum([
  'asset',
  'auto_rickshaw',
  'bus',
  'car',
  'cng',
  'microbus',
  'motorcycle',
  'pickup',
  'ship',
  'truck',
]);

export type ObjectType = z.infer<typeof ObjectType>;

export const ObjectStatus = z.enum(['active', 'disabled']);

export type ObjectStatus = z.infer<typeof ObjectStatus>;

export const ServerAddress = z.enum(['domain', 'ip']);

export type ServerAddress = z.infer<typeof ServerAddress>;

export const ImeiRule = z.enum(['imei_15', 'digits', 'hex']);

export type ImeiRule = z.infer<typeof ImeiRule>;

export const ObjectExpiry = z.enum(['expired', 'expiring', 'valid']);

export type ObjectExpiry = z.infer<typeof ObjectExpiry>;

const IMEI_RULES: Record<ImeiRule, RegExp> = {
  imei_15: /^[0-9]{15}$/,
  digits: /^[0-9]{6,20}$/,
  hex: /^[0-9A-F]{6,20}$/,
};

export const imeiFitsRule = (imei: string, rule: ImeiRule): boolean =>
  IMEI_RULES[rule].test(imei);

export const ImeiInput = z
  .string()
  .overwrite((value) => value.replace(/[\s-]/g, '').toUpperCase())
  .regex(/^[0-9A-F]{6,20}$/);

export const Plate = z.string().trim().min(1).max(40);

export type Plate = z.infer<typeof Plate>;

export const Sim = z
  .string()
  .overwrite((value) => value.replace(/[\s+-]/g, ''))
  .regex(/^[0-9]{6,15}$/);

export type Sim = z.infer<typeof Sim>;

export const DeviceModel = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  port: z.int(),
  imeiRule: ImeiRule,
});

export type DeviceModel = z.infer<typeof DeviceModel>;

export const DeviceModels = z.array(DeviceModel);

export type DeviceModels = z.infer<typeof DeviceModels>;

export const FittedDevice = z.object({
  imei: IMEI,
  model: z.object({
    id: z.string(),
    name: z.string(),
    brand: z.string(),
  }),
  fittedAt: UtcTime,
});

export type FittedDevice = z.infer<typeof FittedDevice>;

export const TrackedObject = z.object({
  id: z.string(),
  client: NamedId,
  name: z.string(),
  plate: z.string().nullable(),
  type: ObjectType,
  sim: z.string().nullable(),
  driverName: z.string().nullable(),
  installationDate: DateOnly,
  inactiveDate: DateOnly,
  expired: z.boolean(),
  serverAddress: ServerAddress,
  status: ObjectStatus,
  device: FittedDevice.nullable(),
  lastSeenAt: UtcTime.nullable(),
  createdAt: UtcTime,
});

export type TrackedObject = z.infer<typeof TrackedObject>;

export const ObjectPage = paged(TrackedObject);

export type ObjectPage = z.infer<typeof ObjectPage>;

export const ObjectsQuery = PageQuery.extend({
  q: z.string().trim().max(100).optional(),
  clientId: Id.optional(),
  status: ObjectStatus.optional(),
  expiry: ObjectExpiry.optional(),
});

export type ObjectsQuery = z.infer<typeof ObjectsQuery>;

export const ObjectLookupQuery = z.union([
  z.object({
    imei: ImeiInput,
  }),
  z.object({
    clientId: Id,
    q: z.string().trim().max(100).optional(),
  }),
]);

export type ObjectLookupQuery = z.infer<typeof ObjectLookupQuery>;

export const ObjectChoice = z.object({
  id: z.string(),
  name: z.string(),
  plate: z.string().nullable(),
  client: NamedId,
  imei: IMEI.nullable(),
});

export type ObjectChoice = z.infer<typeof ObjectChoice>;

export const ObjectChoices = z.array(ObjectChoice);

export type ObjectChoices = z.infer<typeof ObjectChoices>;

const NewObjectFields = z.object({
  clientId: Id,
  name: Name,
  plate: Plate.optional(),
  type: ObjectType,
  sim: Sim.optional(),
  installationDate: DateOnly.optional(),
  inactiveDate: DateOnly.optional(),
  serverAddress: ServerAddress.optional(),
});

const datesInOrder = (value: {
  installationDate?: string | undefined;
  inactiveDate?: string | undefined;
}): boolean =>
  value.installationDate === undefined ||
  value.inactiveDate === undefined ||
  value.inactiveDate >= value.installationDate;

export const CreateObjectRequest = NewObjectFields.extend({
  imei: ImeiInput,
  modelId: Id,
}).refine(datesInOrder, {
  path: ['inactiveDate'],
});

export type CreateObjectRequest = z.infer<typeof CreateObjectRequest>;

export const MoveDeviceRequest = NewObjectFields.refine(datesInOrder, {
  path: ['inactiveDate'],
});

export type MoveDeviceRequest = z.infer<typeof MoveDeviceRequest>;

export const UpdateObjectRequest = z.object({
  name: Name,
  plate: Plate.nullable(),
  type: ObjectType,
  sim: Sim.nullable(),
  installationDate: DateOnly,
  serverAddress: ServerAddress,
});

export type UpdateObjectRequest = z.infer<typeof UpdateObjectRequest>;

export const SetDeviceRequest = z.object({
  imei: ImeiInput,
  modelId: Id,
});

export type SetDeviceRequest = z.infer<typeof SetDeviceRequest>;

export const SetExpiryRequest = z.object({
  ids: z
    .array(Id)
    .min(1)
    .max(500)
    .refine((ids) => new Set(ids).size === ids.length),
  inactiveDate: DateOnly,
});

export type SetExpiryRequest = z.infer<typeof SetExpiryRequest>;

export const InstallStage = z.enum(['saved', 'first_data', 'live']);

export type InstallStage = z.infer<typeof InstallStage>;

export const ObjectCheck = z.object({
  name: z.string(),
  plate: z.string().nullable(),
  client: NamedId,
  status: ObjectStatus,
  device: FittedDevice,
  stage: InstallStage,
  lastSeenAt: UtcTime.nullable(),
  positionAt: UtcTime.nullable(),
});

export type ObjectCheck = z.infer<typeof ObjectCheck>;
