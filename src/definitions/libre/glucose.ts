import { LibreBoolString } from './common.js';

export type LibreEntryDirection = 'Stable' | 'Rising' | 'Falling';

export interface ILibreExtendedProperties {
  factoryTimestamp: string;
  lowOutOfRange: LibreBoolString;
  highOutOfRange: LibreBoolString;
  isFirstAfterTimeChange: boolean;
  canMerge: LibreBoolString;
}

export interface ILibreUnscheduledExtendedProperties {
  factoryTimestamp: string;
  lowOutOfRange: LibreBoolString;
  highOutOfRange: LibreBoolString;
  trendArrow: LibreEntryDirection;
  isActionable: boolean;
  isFirstAfterTimeChange: boolean;
}

export interface ILibreUnscheduledContinuousGlucoseEntry {
  valueInMgPerDl: number;
  extendedProperties: ILibreUnscheduledExtendedProperties;
  recordNumber: number;
  timestamp: string;
}

export type ILibreUnscheduledContinuousGlucoseEntries = ILibreUnscheduledContinuousGlucoseEntry[];

export interface ILibreScheduledContinuousGlucoseEntry {
  valueInMgPerDl: number;
  extendedProperties: ILibreExtendedProperties;
  recordNumber: number;
  timestamp: string;
}

export type ILibreScheduledContinuousGlucoseEntries = ILibreScheduledContinuousGlucoseEntry[];
