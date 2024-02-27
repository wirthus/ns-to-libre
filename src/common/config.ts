import { readFileSync, writeFileSync } from 'fs';

import dayjs from 'dayjs';
import { parse, stringify } from 'yaml';
import { InferType, boolean, date, number, object, string } from 'yup';

const nightscoutScheme = object({
  url: string().url().required(),
  token: string().required(),
});

const authScheme = object({
  username: string().required(),
  password: string().required(),
  deviceId: string().required(),
  setDevice: boolean().required(),
  culture: string().required(),
  domain: string().required(),
  gatewayType: string().required(),
});

const deviceScheme = object({
  uom: string().required(),
  selectedLanguage: string().required(),
  glucoseTargetRangeLowInMgPerDl: number().required(),
  glucoseTargetRangeHighInMgPerDl: number().required(),
  selectedTimeFormat: string().required(),
  selectedCarbType: string().required(),
  hardwareDescriptor: string().required(),
  hardwareName: string().required(),
  osType: string().required(),
  osVersion: string().required(),
  modelName: string().required(),
  firmwareVersion: string().required(),
  uniqueIdentifier: string(),
});

const libreScheme = object({
  endpoint: string().url().required(),

  auth: authScheme.required(),
  device: deviceScheme.required(),
});

const unscheduledScheme = object({
  frequencyMinutes: number().required(),
  startHour: number().required(),
  endHour: number().required(),
});

const convertScheme = object({
  startDate: date().required(),
  endDate: date().required(),
  count: number().required(),
  unscheduled: unscheduledScheme.required(),
});

const configSchema = object({
  nightscout: nightscoutScheme.required(),
  libre: libreScheme.required(),
  convert: convertScheme.required(),
});

export type IConfig = InferType<typeof configSchema>;
export type INightscountConfig = InferType<typeof nightscoutScheme>;
export type ILibreConfig = InferType<typeof libreScheme>;
export type ILibreAuthConfig = InferType<typeof authScheme>;
export type ILibreDeviceConfig = InferType<typeof deviceScheme>;
export type IConvertUnscheduledConfig = InferType<typeof unscheduledScheme>;
export type IConvertConfig = InferType<typeof convertScheme>;

export function getDefaultConfig(): IConfig {
  const startDate = dayjs()
    .set('D', 1)
    .hour(0).minute(0).second(0).millisecond(0)
    .toDate();

  const endDate = dayjs()
    .toDate();

  return {
    nightscout: {
      url: '<url>',
      token: '<token>',
    },
    libre: {
      endpoint: 'https://api.libreview.ru',
      auth: {
        username: '<username>',
        password: '<password>',
        deviceId: '<deviceId>',
        setDevice: false,
        culture: 'ru-RU',
        domain: 'Libreview',
        gatewayType: 'FSLibreLink.Android',
      },
      device: {
        uom: 'mmol/L',
        selectedLanguage: 'ru_RU',
        glucoseTargetRangeLowInMgPerDl: 70,
        glucoseTargetRangeHighInMgPerDl: 180,
        selectedTimeFormat: '24hr',
        selectedCarbType: 'grams of carbs',
        hardwareDescriptor: 'RMX1921',
        hardwareName: 'realme',
        osType: 'Android',
        osVersion: '30',
        modelName: 'com.freestylelibre.app.ru',
        firmwareVersion: '2.10.1',
        uniqueIdentifier: '',
      },
    },
    convert: {
      startDate: startDate,
      endDate: endDate,
      count: 31000,
      unscheduled: {
        frequencyMinutes: 90,
        startHour: 7,
        endHour: 22,
      },
    },
  };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getValidatedConfig(object: any): IConfig {
  try {
    const validatedConfig = configSchema.validateSync(object, {
      abortEarly: true,
    });

    return validatedConfig;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Config error: ${error.message}`);
    } else {
      console.error('Unknown error during config validation');
    }

    process.exit(1);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function readConfig(filePath: string): any {
  const yamlFile = readFileSync(filePath, 'utf8');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const config = parse(yamlFile);

  return config;
}

export function writeConfig(path: string, config: IConfig) {
  return writeFileSync(path, stringify(config), 'utf8');
}
