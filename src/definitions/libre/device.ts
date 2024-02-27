export interface ILibreDeviceDataHeader {
  device: ILibreDevice;
}

export interface ILibreDevice {
  hardwareDescriptor: string;
  osVersion: string;
  modelName: string;
  osType: string;
  uniqueIdentifier: string;
  hardwareName: string;
}

export interface ILibreDeviceSettings {
  factoryConfig?: ILibreFactoryConfig;
  firmwareVersion: string;
  miscellaneous: ILibreMiscellaneous;
}

export interface ILibreFactoryConfig {
  UOM: string;
}

export interface ILibreMiscellaneous {
  selectedLanguage: string;
  valueGlucoseTargetRangeLowInMgPerDl: number;
  valueGlucoseTargetRangeHighInMgPerDl: number;
  selectedTimeFormat: string;
  selectedCarbType: string;
}
