#!/usr/bin/env node

import { Command } from 'commander';
import { runScan } from './index';
import packageJson from '../package.json' 

export interface CliIO {
  log: (message: string) => void;
  error: (message: string) => void;
}

export function createCli(io: CliIO = console): Command {
  const program = new Command()
    .name('un-shitty-fy')
    .description(
      'Clean duplicated, unreachable, and oversized code. (Scaffolded CLI)',
    )
    .version(packageJson.version ?? '0.0.0')
    .argument('[targets...]', 'Files or directories to scan')
    .option('-f, --format <format>', 'Output format: text|json', 'text')
    .action(async (targets: string[] = [], options) => {
      const result = await runScan({ paths: targets });

      if (options.format === 'json') {
        io.log(JSON.stringify(result, null, 2));
        return;
      }

      if (result.status === 'noop') {
        io.log('No targets specified. Provide files or directories to scan.');
        return;
      }

      io.log(`Scanned ${result.scanned} target(s).`);
    });

  return program;
}

export async function main(argv: string[] = process.argv): Promise<void> {
  const program = createCli();

  // Prevent Commander from calling process.exit in tests.
  if (process.env.NODE_ENV === 'test') {
    program.exitOverride();
  }

  await program.parseAsync(argv);
}

if (process.env.NODE_ENV !== 'test') {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

