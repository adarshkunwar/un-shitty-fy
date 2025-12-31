export type ScanResult =
  | { status: 'noop'; message: string }
  | { status: 'ok'; scanned: number };

export interface ScanOptions {
  paths: string[];
}

/**
 * Placeholder scan implementation.
 * Future steps will wire real analyzers for duplicates, unreachable code, and size heuristics.
 */
export async function runScan(options: ScanOptions): Promise<ScanResult> {
  if (!options.paths || options.paths.length === 0) {
    return { status: 'noop', message: 'No paths provided' };
  }

  return {
    status: 'ok',
    scanned: options.paths.length,
  };
}

