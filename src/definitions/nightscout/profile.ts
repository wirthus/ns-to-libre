export interface CarbRatio {
  time: string;
  value: number;
  timeAsSeconds: number;
}

export interface Sensitivity {
  time: string;
  value: number;
  timeAsSeconds: number;
}

export interface Basal {
  time: string;
  value: number;
  timeAsSeconds: number;
}

export interface Target {
  time: string;
  value: number;
  timeAsSeconds: number;
}

export interface Profile {
  dia: number;
  carbratio: CarbRatio[];
  carbs_hr: number;
  delay: number;
  sens: Sensitivity[];
  timezone?: string;
  basal: Basal[];
  target_low: Target[];
  target_high: Target[];
  startDate: string;
  units: string;
}

type Store = Record<string, Profile>;

export interface INightscoutProfile {
  _id: string;
  defaultProfile: string;
  store: Store;
  startDate: string;
  mills: number;
  units: string;
  created_at: string;
}
