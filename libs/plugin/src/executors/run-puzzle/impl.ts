import { ExecutorContext } from '@nx/devkit';
import { exec } from 'child_process';
import { join } from 'path';
import { promisify } from 'util';

export interface EchoExecutorOptions {
  puzzle: number;
}

export default async function echoExecutor(
  options: EchoExecutorOptions,
  context: ExecutorContext
) {
  const projectConfig = context.workspace.projects[context.projectName];
  console.info(
    `Running puzzle ${options.puzzle} for ${context.projectName}...`
  );

  const tsconfigPath = join(
    context.root,
    projectConfig.root,
    'tsconfig.lib.json'
  );

  const puzzlePath = join(
    context.root,
    projectConfig.sourceRoot,
    'lib',
    `run-0${options.puzzle}.ts`
  );

  const { stdout, stderr } = await promisify(exec)(
    `ts-node --project ${tsconfigPath} ${puzzlePath}`
  );
  console.log(stdout);
  console.error(stderr);

  const success = !stderr;

  return { success };
}
