import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { processPolymer } from './polymer';
import { MinMax } from '@advent-of-code-2021-nx/util-arrays';

export async function calculateAnswer(
  fileName: string,
  steps: number
): Promise<{ minMax: MinMax; length: number; answer: number }> {
  const promise = new Promise<{
    length: number;
    minMax: MinMax;
    answer: number;
  }>((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const lines: string[] = [];

    rl.on('line', (line) => {
      lines.push(line);
    });

    rl.on('close', () => {
      const template = lines[0];

      const rules = new Map<string, string>();

      lines.slice(2).forEach((line) => {
        const split = line.split(' -> ');

        rules.set(split[0], split[1]);
      });
      const time = Date.now();
      const polymerMinMax = processPolymer(template, rules, steps);

      const answer =
        polymerMinMax.minMax.maxCount - polymerMinMax.minMax.minCount;

      console.log(`Calculating answer took ${Date.now() - time}ms`);

      console.log(polymerMinMax);

      const resolveTo = {
        ...polymerMinMax,
        answer,
      };

      // console.log(resolveTo);

      resolve(resolveTo);
    });
  });

  return promise;
}
