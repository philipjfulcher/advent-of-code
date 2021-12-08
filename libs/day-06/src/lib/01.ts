import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { simulateLanternFish } from './lantern-fish-revised';

export async function calculateAnswer(fileName: string, numberOfDays: number) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const initialLanternFish: number[] = [];

    rl.on('line', (line) => {
      line
        .split(',')
        .forEach((lanternFish) =>
          initialLanternFish.push(parseInt(lanternFish, 10))
        );
    });

    rl.on('close', () => {
      console.log(initialLanternFish);

      const fishCount = simulateLanternFish(initialLanternFish, numberOfDays);
      console.log({ fishCount });
      resolve(fishCount);
    });
  });

  return promise;
}
