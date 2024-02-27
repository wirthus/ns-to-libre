import { ILibreDeviceDataHeader, ILibreDeviceSettings } from './device.js';
import { ILibreFoodEntry } from './food.js';
import { ILibreGenericEntry } from './generic.js';
import { ILibreScheduledContinuousGlucoseEntries, ILibreUnscheduledContinuousGlucoseEntries } from './glucose.js';
import { ILibreInsulinEntry } from './insulin.js';

export interface ILibreMeasurementsRequest {
  UserToken: string;
  GatewayType: string;
  Domain: string;
  DeviceData: ILibreMeasurementsDeviceData;
}

export interface ILibreMeasurementsResult {
  UploadId: string;
  Status: number;
  MeasurementCounts: {
    ScheduledGlucoseCount: number;
    UnScheduledGlucoseCount: number;
    BloodGlucoseCount: number;
    InsulinCount: number;
    GenericCount: number;
    FoodCount: number;
    KetoneCount: number;
    TotalCount: number;
  };
  ItemCount: number;
  CreatedDateTime: string;
  SerialNumber: string;
}

export interface ILibreMeasurementsDeviceData {
  deviceSettings: ILibreDeviceSettings;
  header: ILibreDeviceDataHeader;
  measurementLog: ILibreMeasurementLog;
}

export interface ILibreMeasurementLog {
  capabilities: string[];
  bloodGlucoseEntries: any[];
  genericEntries: ILibreGenericEntry[];
  ketoneEntries: any[];
  scheduledContinuousGlucoseEntries: ILibreScheduledContinuousGlucoseEntries;
  insulinEntries: ILibreInsulinEntry[];
  foodEntries: ILibreFoodEntry[];
  unscheduledContinuousGlucoseEntries: ILibreUnscheduledContinuousGlucoseEntries;
}
