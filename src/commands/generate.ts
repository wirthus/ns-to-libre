import { Command } from 'commander';

import { getDefaultConfig, writeConfig } from '../common/config.js';

export const command = new Command('generate')
  .description('generate default "config.yaml" file')
  .alias('g')
  .action(() => {
    writeConfig('config.yaml', getDefaultConfig());

    process.exit(0);
  });
