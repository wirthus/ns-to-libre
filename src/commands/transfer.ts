import colors from 'colors';
import { Command } from 'commander';
import dayjs from 'dayjs';
import { boolean, object, string } from 'yup';

import { LibreApi } from '../api/libre.api.js';
import { NightscoutApi } from '../api/nightscout.api.js';
import { getValidatedConfig, readConfig } from '../common/config.js';
import { convertEntries } from '../methods/convert.js';
import { getLibreToken, sendMeasurements } from '../methods/libre.js';
import { getEntries } from '../methods/nightscout.js';

export const command = new Command('convert')
  .description('convert and transfer Nightscout data to LibreView')
  .alias('c')
  .option(
    '-c, --config <path>',
    'path to config file',
    'config.yaml'
  )
  .option(
    '--dry-run',
    'do not send data to LibreView'
  )
  .action(async (options) => {
    try {
      await transferCommand(options);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('Unknown error', err);
      }

      process.exit(1);
    }
  });

const argsScheme = object({
  config: string().required(),
  dryRun: boolean(),
});

function arrayIsEmpty<T>(arr: T[] | null | undefined): boolean {
  return !arr || !arr.length;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function transferCommand(options: any) {
  const args = await argsScheme.validate(options, { abortEarly: true });

  const config = getValidatedConfig(readConfig(args.config));

  const format = 'L LTS';
  const fromDate = dayjs(config.convert.startDate).format(format);
  const toDate = dayjs(config.convert.endDate).format(format);
  console.log('Transfer time span', colors.gray(fromDate), '-', colors.gray(toDate));

  const nightscoutApi = new NightscoutApi(config.nightscout.url, config.nightscout.token);
  const libreApi = new LibreApi(config.libre.endpoint);

  // Authenticate LibreView
  const libreToken = await getLibreToken(libreApi, config.libre.auth);
  if (!libreToken) {
    throw new Error('LibreView authentication failed');
  }

  // Get Nightscout entries
  const convert = config.convert;
  const entries = await getEntries(nightscoutApi, convert.startDate, convert.endDate, convert.count);
  if (!entries.length) {
    console.log(colors.blue('No entries'));

    return;
  }

  console.log('Entries count', colors.gray(entries.length.toString()));

  // Convert Nightscout entries to LibreView format
  const libreEntries = convertEntries(entries, {
    lowOutOfRange: config.libre.device.glucoseTargetRangeLowInMgPerDl,
    highOutOfRange: config.libre.device.glucoseTargetRangeHighInMgPerDl,
    unscheduled: config.convert.unscheduled,
  });

  if (arrayIsEmpty(libreEntries.scheduledContinuousGlucoseEntries) && arrayIsEmpty(libreEntries.unscheduledContinuousGlucoseEntries)) {
    console.log(colors.blue('No glucose entries'));

    return;
  }

  // Send entries to LibreView
  if (!args.dryRun) {
    const result = await sendMeasurements(libreApi, libreToken, config.libre.auth, config.libre.device, libreEntries);
    console.log('Transfer result', colors.gray(JSON.stringify(result)));
  } else {
    if (libreEntries.unscheduledContinuousGlucoseEntries) {
      libreEntries.unscheduledContinuousGlucoseEntries.forEach((entry) => {
        console.log(dayjs(entry.timestamp).local().format('L LTS'));
      });
    }
  }
}
