import { z } from 'zod';
import { AccountStatus, Email, Name, Phone, Username } from './accounts.js';
import { Id, NamedId, paged, PageQuery, UtcTime } from './common.js';

export const ClientType = z.enum(['individual', 'corporate', 'demo']);

export type ClientType = z.infer<typeof ClientType>;

export const RegularClientType = ClientType.exclude(['demo']);

export type RegularClientType = z.infer<typeof RegularClientType>;

export const ClientStatus = z.enum(['active', 'disabled']);

export type ClientStatus = z.infer<typeof ClientStatus>;

export const ClientAccount = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  status: AccountStatus,
  defaultPassword: z.boolean(),
  lastSignInAt: UtcTime.nullable(),
});

export type ClientAccount = z.infer<typeof ClientAccount>;

export const Client = z.object({
  id: z.string(),
  name: z.string(),
  type: ClientType,
  status: ClientStatus,
  accountCap: z.int(),
  accountCount: z.int(),
  reseller: NamedId.nullable(),
  package: NamedId,
  account: ClientAccount.nullable(),
  createdAt: UtcTime,
});

export type Client = z.infer<typeof Client>;

export const ClientPage = paged(Client);

export type ClientPage = z.infer<typeof ClientPage>;

export const ClientsQuery = PageQuery.extend({
  q: z.string().trim().max(100).optional(),
  type: ClientType.optional(),
  status: ClientStatus.optional(),
  reseller: z.union([Id, z.literal('none')]).optional(),
});

export type ClientsQuery = z.infer<typeof ClientsQuery>;

export const ClientLookupQuery = z.object({
  q: z.string().trim().min(2).max(100),
});

export type ClientLookupQuery = z.infer<typeof ClientLookupQuery>;

export const ClientChoice = z.object({
  id: z.string(),
  name: z.string(),
  type: ClientType,
});

export type ClientChoice = z.infer<typeof ClientChoice>;

export const ClientChoices = z.array(ClientChoice);

export type ClientChoices = z.infer<typeof ClientChoices>;

export const CreateClientRequest = z.object({
  name: Name,
  type: RegularClientType,
  username: Username,
  phone: Phone,
  email: Email.optional(),
});

export type CreateClientRequest = z.infer<typeof CreateClientRequest>;

export const UpdateClientRequest = z.object({
  name: Name,
  type: RegularClientType,
  phone: Phone,
  email: Email.nullable(),
});

export type UpdateClientRequest = z.infer<typeof UpdateClientRequest>;

export const SetAccountCapRequest = z.object({
  accountCap: z.int().min(1).max(1000),
});

export type SetAccountCapRequest = z.infer<typeof SetAccountCapRequest>;

export const SetResellerRequest = z.object({
  resellerId: Id.nullable(),
});

export type SetResellerRequest = z.infer<typeof SetResellerRequest>;
