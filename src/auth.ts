import { z } from 'zod';
import { ClientRole, Password, Phone, Role, StaffRole } from './accounts.js';
import { NamedId, UtcTime } from './common.js';

const EnteredPassword = z.string().min(1).max(128);

export const Login = z
  .string()
  .trim()
  .min(1)
  .max(254)
  .overwrite((value) => {
    const phone = Phone.safeParse(value);

    return phone.success ? phone.data : value.toLowerCase();
  });

export type Login = z.infer<typeof Login>;

export const SignInRequest = z.object({
  login: Login,
  password: EnteredPassword,
});

export type SignInRequest = z.infer<typeof SignInRequest>;

export const AccessToken = z.object({
  accessToken: z.string(),
  expiresAt: UtcTime,
});

export type AccessToken = z.infer<typeof AccessToken>;

export const Me = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  role: Role,
  defaultPassword: z.boolean(),
});

export type Me = z.infer<typeof Me>;

export const ClientMe = Me.extend({
  role: ClientRole,
  client: NamedId,
  viewedBy: z
    .object({
      id: z.string(),
      name: z.string(),
      role: StaffRole,
    })
    .nullable(),
});

export type ClientMe = z.infer<typeof ClientMe>;

export const ChangePasswordRequest = z.object({
  currentPassword: EnteredPassword,
  newPassword: Password,
});

export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequest>;

export const LoginAsCode = z.object({
  code: z.string().regex(/^[A-Za-z0-9_-]{43}$/),
});

export type LoginAsCode = z.infer<typeof LoginAsCode>;

const ResetReference = z.string().regex(/^[A-Za-z0-9_-]{22}$/);

export const PasswordResetRequest = z.object({
  phone: Phone,
});

export type PasswordResetRequest = z.infer<typeof PasswordResetRequest>;

export const PasswordResetStarted = z.object({
  reference: ResetReference,
});

export type PasswordResetStarted = z.infer<typeof PasswordResetStarted>;

export const PasswordResetConfirm = z.object({
  reference: ResetReference,
  code: z
    .string()
    .trim()
    .regex(/^[0-9]{6}$/),
  newPassword: Password,
});

export type PasswordResetConfirm = z.infer<typeof PasswordResetConfirm>;

export const ApiErrorCode = z.enum([
  'invalid',
  'same_password',
  'unauthorized',
  'wrong_sign_in',
  'account_disabled',
  'forbidden',
  'wrong_password',
  'already_taken',
  'has_objects',
  'imei_taken',
  'no_device',
  'wrong_code',
  'expired',
  'account_cap_reached',
  'too_many_tries',
  'not_found',
  'internal',
]);

export type ApiErrorCode = z.infer<typeof ApiErrorCode>;

const ApiIssue = z.object({
  path: z.string(),
  message: z.string(),
});

const ImeiHolder = z.object({
  client: NamedId,
  object: NamedId,
});

export const ApiError = z.object({
  error: ApiErrorCode,
  message: z.string(),
  issues: z.array(ApiIssue).optional(),
  holder: ImeiHolder.optional(),
});

export type ApiError = z.infer<typeof ApiError>;
