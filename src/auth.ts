import { z } from 'zod';
import { Password, Phone, Role } from './accounts.js';
import { UtcTime } from './common.js';

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

export const ChangePasswordRequest = z.object({
  currentPassword: EnteredPassword,
  newPassword: Password,
});

export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequest>;

export const ApiErrorCode = z.enum([
  'invalid',
  'same_password',
  'unauthorized',
  'wrong_sign_in',
  'account_disabled',
  'wrong_password',
  'too_many_tries',
  'not_found',
  'internal',
]);

export type ApiErrorCode = z.infer<typeof ApiErrorCode>;

const ApiIssue = z.object({
  path: z.string(),
  message: z.string(),
});

export const ApiError = z.object({
  error: ApiErrorCode,
  message: z.string(),
  issues: z.array(ApiIssue).optional(),
});

export type ApiError = z.infer<typeof ApiError>;
