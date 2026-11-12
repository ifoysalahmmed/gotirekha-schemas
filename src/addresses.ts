import { z } from 'zod';

export const ADDRESSES_MAX_POINTS = 100;

export const AddressPoint = z.object({
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
});

export type AddressPoint = z.infer<typeof AddressPoint>;

export const AddressesRequest = z.object({
  points: z.array(AddressPoint).min(1).max(ADDRESSES_MAX_POINTS),
});

export type AddressesRequest = z.infer<typeof AddressesRequest>;

export const Addresses = z.object({
  addresses: z.array(z.string().nullable()),
});

export type Addresses = z.infer<typeof Addresses>;
