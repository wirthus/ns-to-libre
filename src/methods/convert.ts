import dayjs, { Dayjs } from 'dayjs';

import type { IConvertUnscheduledConfig } from '../common/config.js';
import {
  ILibreMeasurementLog,
  ILibreScheduledContinuousGlucoseEntries,
  ILibreUnscheduledContinuousGlucoseEntries,
  LibreBoolString,
  LibreEntryDirection,
  LibreRecordNumberIncrement,
  LibreRecordNumberIncrementUnscheduled
} from '../definitions/libre/index.js';
import { INsEntry, NsEntryDirection } from '../definitions/nightscout/index.js';

interface IFraq {
  min: number;
  max: number;
}

interface IReduce {
  lastDate: Dayjs | null;
  intervalMinutes: number;
  entries: INsEntry[];
}

export interface IConvertConfig {
  lowOutOfRange: number;
  highOutOfRange: number;
  unscheduled: IConvertUnscheduledConfig;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getFraq(value: number, percent: number): IFraq {
  const min = value * (1 - percent / 100);
  const max = value * (1 + percent / 100);

  return { min, max };
}

function getDirection(value: NsEntryDirection): LibreEntryDirection {
  switch (value) {
    case 'FortyFiveDown':
    case 'SingleDown':
    case 'DoubleDown':
    case 'TripleDown':
      return 'Falling';

    case 'FortyFiveUp':
    case 'SingleUp':
    case 'DoubleUp':
    case 'TripleUp':
      return 'Rising';

    default:
      return 'Stable';
  }
}

function filterData(entries: INsEntry[], config: IConvertUnscheduledConfig): INsEntry[] {
  const fraq = getFraq(config.frequencyMinutes, 30);

  const filteredEntries = entries.reduce<IReduce>((acc, singleEntry) => {
    const date = dayjs(singleEntry.date).utcOffset(singleEntry.utcOffset);
    const hour = date.hour();

    if (hour >= config.startHour && hour <= config.endHour) {
      if (acc.lastDate === null) {
        acc.lastDate = date;
        acc.entries.push(singleEntry);
      } else {
        const diff = acc.lastDate.diff(date, 'minute');

        if (diff >= acc.intervalMinutes) {
          acc.lastDate = date;
          acc.entries.push(singleEntry);
          acc.intervalMinutes = randomInt(fraq.min, fraq.max);
        }
      }
    }

    return acc;
  }, {
    lastDate: null,
    intervalMinutes: randomInt(fraq.min, fraq.max),
    entries: []
  });

  return filteredEntries.entries;
}

function boolToString(value: boolean): LibreBoolString {
  return value ? 'true' : 'false';
}

function getLowOutOfRange(value: number, limit: number): LibreBoolString {
  return boolToString(value <= limit);
}

function getHighOutOfRange(value: number, limit: number): LibreBoolString {
  return boolToString(value >= limit);
}

export function convertEntries(entries: INsEntry[], config: IConvertConfig): Partial<ILibreMeasurementLog> {
  const glucoseScheduledEntries: ILibreScheduledContinuousGlucoseEntries = entries.map(t => {
    const dateUtc = dayjs(t.date);
    const dateLocal = dateUtc.utcOffset(t.utcOffset);

    return {
      valueInMgPerDl: t.sgv,
      extendedProperties: {
        factoryTimestamp: t.sysTime,
        lowOutOfRange: getLowOutOfRange(t.sgv, config.lowOutOfRange),
        highOutOfRange: getHighOutOfRange(t.sgv, config.highOutOfRange),
        isFirstAfterTimeChange: false,
        canMerge: 'true',
      },
      recordNumber: LibreRecordNumberIncrement + dateUtc.unix(),
      timestamp: dateLocal.format(),
    };
  });

  const glucoseUnscheduledEntries: ILibreUnscheduledContinuousGlucoseEntries = filterData(entries, config.unscheduled).map(t => {
    const duration = randomInt(1, 4);
    const newDate = dayjs(t.date).utcOffset(t.utcOffset).add(duration, 'minute');

    return {
      valueInMgPerDl: t.sgv,
      extendedProperties: {
        factoryTimestamp: newDate.utc().format(),
        lowOutOfRange: getLowOutOfRange(t.sgv, config.lowOutOfRange),
        highOutOfRange: getHighOutOfRange(t.sgv, config.highOutOfRange),
        trendArrow: getDirection(t.direction),
        isActionable: true,
        isFirstAfterTimeChange: false,
      },
      recordNumber: LibreRecordNumberIncrementUnscheduled + newDate.unix(),
      timestamp: newDate.format(),
    };
  });

  return {
    scheduledContinuousGlucoseEntries: glucoseScheduledEntries,
    unscheduledContinuousGlucoseEntries: glucoseUnscheduledEntries,
  };
}
