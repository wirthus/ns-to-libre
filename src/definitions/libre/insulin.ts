import { ILibreExtendedProperties } from './glucose.js';

export interface ILibreInsulinEntry {
  extendedProperties: ILibreExtendedProperties;
  recordNumber: number;
  timestamp: string;
  units: number;
  insulinType: string;
}
