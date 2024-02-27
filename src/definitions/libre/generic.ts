export interface ILibreGenericEntry {
  type: string;
  extendedProperties: ILibreGenericExtendedProperties;
  recordNumber: number;
  timestamp: string;
}

export interface ILibreGenericExtendedProperties {
  factoryTimestamp: string;
  gmin: string;
  gmax: string;
  wearDuration: string;
  warmupTime: string;
  productType: string;
}
