import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { createMatrix } from '@advent-of-code/util-arrays';
import { findPartNumbers } from './partNumberFinder';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const lines: string[][] = [];

    rl.on('line', (line) => {
      lines.push(line.split(''));
    });

    rl.on('close', () => {
      const schematic = createMatrix<string>(lines);
      const partNumbers = findPartNumbers(schematic);

      const answer = partNumbers.reduce((acc, cur) => {
        return acc + Number.parseInt(cur);
      }, 0);

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
