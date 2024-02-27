import { ILibreExtendedProperties } from './glucose.js';

export interface ILibreFoodEntry {
  extendedProperties: ILibreExtendedProperties;
  recordNumber: number;
  timestamp: string;
  gramsCarbs: number;
  foodType: string;
}
