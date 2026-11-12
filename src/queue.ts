import type { IMEI } from './common.js';

export const RECORDS_STREAM = 'DEVICE_RECORDS';

export const RECORDS_SUBJECTS = 'device.records.>';

export const recordSubject = (imei: IMEI): string => `device.records.${imei}`;

export const REGISTRY_CHANGED = 'registry.changed';

export const SETTINGS_CHANGED = 'settings.changed';

export const LIVE_SUBJECTS = 'live.>';

export const liveSubject = (clientId: string): string => `live.${clientId}`;
