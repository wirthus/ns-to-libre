import { LibreApi } from '../api/libre.api.js';
import type { ILibreAuthConfig, ILibreDeviceConfig } from '../common/config.js';
import { ILibreAuthData, ILibreMeasurementLog, ILibreMeasurementsDeviceData, ILibreMeasurementsRequest } from '../definitions/libre/index.js';

export async function getLibreToken(instance: LibreApi, auth: ILibreAuthConfig): Promise<string | undefined> {
  const data: ILibreAuthData = {
    Culture: auth.culture,
    DeviceId: auth.deviceId,
    GatewayType: auth.gatewayType,
    SetDevice: auth.setDevice,
    Domain: auth.domain,
    UserName: auth.username,
    Password: auth.password,
  };

  return instance.auth(data);
}

export async function sendMeasurements(instance: LibreApi, token: string, auth: ILibreAuthConfig, device: ILibreDeviceConfig, measurements: Partial<ILibreMeasurementLog>) {
  console.log('transferLibreView'.blue);

  console.log('glucose scheduled entries', (measurements.scheduledContinuousGlucoseEntries ?? []).length.toString().gray);
  console.log('glucose unscheduled entries', (measurements.unscheduledContinuousGlucoseEntries ?? []).length.toString().gray);

  const deviceData: ILibreMeasurementsDeviceData = {
    deviceSettings: {
      factoryConfig: {
        UOM: device.uom
      },
      firmwareVersion: device.firmwareVersion,
      miscellaneous: {
        selectedLanguage: device.selectedLanguage,
        valueGlucoseTargetRangeLowInMgPerDl: device.glucoseTargetRangeLowInMgPerDl,
        valueGlucoseTargetRangeHighInMgPerDl: device.glucoseTargetRangeHighInMgPerDl,
        selectedTimeFormat: device.selectedTimeFormat,
        selectedCarbType: device.selectedCarbType,
      }
    },
    header: {
      device: {
        hardwareDescriptor: device.hardwareDescriptor,
        hardwareName: device.hardwareName,
        osType: device.osType,
        osVersion: device.osVersion,
        modelName: device.modelName,
        uniqueIdentifier: device.uniqueIdentifier ?? '',
      }
    },
    measurementLog: {
      capabilities: [
        'scheduledContinuousGlucose',
        'unscheduledContinuousGlucose',
        // 'bloodGlucose',
        // 'insulin',
        // 'food',
        'generic-com.abbottdiabetescare.informatics.exercise',
        'generic-com.abbottdiabetescare.informatics.customnote',
        'generic-com.abbottdiabetescare.informatics.ondemandalarm.low',
        'generic-com.abbottdiabetescare.informatics.ondemandalarm.high',
        'generic-com.abbottdiabetescare.informatics.ondemandalarm.projectedlow',
        'generic-com.abbottdiabetescare.informatics.ondemandalarm.projectedhigh',
        'generic-com.abbottdiabetescare.informatics.sensorstart',
        'generic-com.abbottdiabetescare.informatics.error',
        'generic-com.abbottdiabetescare.informatics.isfGlucoseAlarm',
        'generic-com.abbottdiabetescare.informatics.alarmSetting'
      ],
      bloodGlucoseEntries: measurements.bloodGlucoseEntries ?? [],
      genericEntries: measurements.genericEntries ?? [],
      ketoneEntries: measurements.ketoneEntries ?? [],
      scheduledContinuousGlucoseEntries: measurements.scheduledContinuousGlucoseEntries ?? [],
      unscheduledContinuousGlucoseEntries: measurements.unscheduledContinuousGlucoseEntries ?? [],
      insulinEntries: measurements.insulinEntries ?? [],
      foodEntries: measurements.foodEntries ?? [],
    }
  };

  const requestData: ILibreMeasurementsRequest = {
    UserToken: token,
    GatewayType: auth.gatewayType,
    DeviceData: deviceData,
    Domain: auth.domain,
  };

  return await instance.sendMeasurements(requestData);
}
