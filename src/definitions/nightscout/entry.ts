export interface INsEntry {
  _id: string;
  device: string;
  date: number;
  dateString: string;
  sgv: number;
  delta: number;
  direction: NsEntryDirection;
  type: NsEntryType;
  filtered: number;
  unfiltered: number;
  rssi: number;
  noise: NsNoiceType;
  sysTime: string;
  utcOffset: number;
  mills: number;
}

export type NsEntryType = 'sgv' | 'mbg' | 'cal';

export type NsEntryDirection =
  'NONE' | // '⇼'
  'TripleUp' | // '⤊'
  'DoubleUp' | // '⇈'
  'SingleUp' | // '↑'
  'FortyFiveUp' | // '↗'
  'Flat' | // '→'
  'FortyFiveDown' | // '↘'
  'SingleDown' | // '↓'
  'DoubleDown' | // '⇊'
  'TripleDown' | // '⤋'
  'NOT COMPUTABLE' | // '-'
  'RATE OUT OF RANGE' // '⇕'
  ;

export enum NsNoiceType {
  None = 0,
  Normal = 1,
  High = 2,
  HighForPredict = 3,
  VeryHigh = 4,
  Extreme = 5,
}
