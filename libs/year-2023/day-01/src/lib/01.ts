import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { findCalibrationValue } from './calibrationValues';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const lines: number[] = [];

    rl.on('line', (line) => {
      lines.push(findCalibrationValue(line, false));
    });

    rl.on('close', () => {
      const answer = lines.reduce((acc, cur) => acc + cur, 0);

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
