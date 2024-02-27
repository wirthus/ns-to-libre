import dayjs from 'dayjs';

import { NightscoutApi } from '../api/nightscout.api.js';
import { INsEntry } from '../definitions/nightscout/index.js';

function getDateValue(date: Date): number {
  return dayjs(date).valueOf();
}

export async function getProfileTimezone(instance: NightscoutApi): Promise<string | undefined> {
  try {
    const { data: profiles } = await instance.profile({
      params: {
        count: 1
      }
    });

    if (profiles.length === 0) throw new Error('Profile not found');

    const firstProfile = profiles[0];
    const defaultProfileName = firstProfile.defaultProfile;
    const timezone = firstProfile.store[defaultProfileName].timezone;

    return timezone;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    throw new Error(`Error fetching profile timezone: ${message}`);
  }
}

export async function getEntries(instance: NightscoutApi, fromDate: Date, toDate: Date, limit: number): Promise<INsEntry[]> {
  try {
    const { data: entries } = await instance.entries({
      params: {
        find: {
          date: {
            $gte: getDateValue(fromDate),
            $lt: getDateValue(toDate),
          }
        },
        count: limit
      }
    });

    return entries;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    throw new Error(`Error fetching entries: ${message}`);
  }
}
