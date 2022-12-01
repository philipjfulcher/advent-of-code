import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';

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
      const entries: { wire: string; display: string }[] = [];

      lines.forEach((line) => {
        const split = line.split('|');

        entries.push({ wire: split[0], display: split[1] });
      });

      const displaySegments: Record<string, number> = {
        '1': 2,
        '4': 4,
        '7': 3,
        '8': 7,
      };

      const reverseLookup: Record<string, string> = {};

      for (const displayNumber in displaySegments) {
        reverseLookup[displaySegments[displayNumber]] = displayNumber;
      }

      let countUniqueNumbers = 0;

      entries.forEach((entry) => {
        const digits = entry.display.split(' ');

        digits.forEach((digit) => {
          if (reverseLookup[digit.length] !== undefined) {
            countUniqueNumbers++;
          }
        });
      });

      console.log(
        `There are ${countUniqueNumbers} digits with a unique combination of segments`
      );

      resolve(countUniqueNumbers);
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
