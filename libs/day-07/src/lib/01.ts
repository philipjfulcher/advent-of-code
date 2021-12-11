import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import {
  calculateMedian,
  calculateMode,
} from '@advent-of-code-2021-nx/util-math';
import { calculateFuelUse } from './calculate-fuel-use';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const lines: string[] = [];

    rl.on('line', (line) => {
      lines.push(line);
    });

    rl.on('close', () => {
      const horizontalPositions = lines[0]
        .split(',')
        .map((str) => parseInt(str, 10));

      const mode = calculateMode(horizontalPositions);
      const median = calculateMedian(horizontalPositions);

      const modeFuelUse = calculateFuelUse(horizontalPositions, mode);
      const medianFuelUse = calculateFuelUse(horizontalPositions, median);

      const lowFuelUse =
        modeFuelUse < medianFuelUse ? modeFuelUse : medianFuelUse;

      console.log(`The most efficient fuel use is ${lowFuelUse}`);
      resolve(lowFuelUse);
    });
  });

  return promise;
}

export async function run() {
  const increaseCount = await calculateAnswer('input.txt');

  console.log(
    `There are ${increaseCount} measurements that are larger than the previous measurement`
  );
}

// run();
