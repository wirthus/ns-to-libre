import './bootstrap/date';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { Command } from 'commander';
import { readPackage } from 'read-pkg';

import { command as generateCommand } from './commands/generate.js';
import { command as transferCommand } from './commands/transfer.js';

async function main() {
  const program = new Command();

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pkg = await readPackage({
    cwd: resolve(__dirname, '..'),
  });

  program
    .name(pkg.name)
    .version(pkg.version);

  if (pkg.description) {
    program.description(pkg.description);
  }

  program
    .addCommand(transferCommand, { isDefault: true })
    .addCommand(generateCommand);

  await program.parseAsync();
}

main().catch(console.error);
