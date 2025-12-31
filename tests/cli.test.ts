import { describe, expect, it } from 'vitest';
import { createCli, type CliIO } from '../src/cli';

async function runCli(args: string[]) {
  const stdout: string[] = [];
  const stderr: string[] = [];
  const io: CliIO = {
    log: (msg) => stdout.push(msg),
    error: (msg) => stderr.push(msg),
  };
  const program = createCli(io);

  program.exitOverride();
  program.configureOutput({
    writeOut: (str) => stdout.push(str),
    writeErr: (str) => stderr.push(str),
  });

  try {
    await program.parseAsync(['node', 'un-shitty-fy', ...args], {
      from: 'node',
    });
  } catch (err: any) {
    // Ignore commander exits for help/version/normal termination
    const knownCodes = [
      'commander.helpDisplayed',
      'commander.version',
      'commander._exit',
    ];
    if (!knownCodes.includes(err?.code)) {
      throw err;
    }
  }

  return { stdout: stdout.join(''), stderr: stderr.join('') };
}

describe('CLI scaffold', () => {
  it('shows help text', async () => {
    const { stdout } = await runCli(['--help']);
    expect(stdout).toContain('un-shitty-fy');
    expect(stdout).toContain('Clean duplicated, unreachable, and oversized code');
  });

  it('runs scan with a target', async () => {
    const { stdout } = await runCli(['src']);
    expect(stdout).toContain('Scanned 1 target');
  });

  it('warns when no targets provided', async () => {
    const { stdout } = await runCli([]);
    expect(stdout).toContain('No targets specified');
  });
});

