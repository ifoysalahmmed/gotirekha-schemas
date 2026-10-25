import type { IMEI } from './common.js';

export const RECORDS_STREAM = 'DEVICE_RECORDS';

export const RECORDS_SUBJECTS = 'device.records.>';

export const recordSubject = (imei: IMEI): string => `device.records.${imei}`;
