import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { calculateOctopusEnergy } from './octopus';

export async function calculateAnswer(fileName: string, steps: number) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const lines: number[][] = [];

    rl.on('line', (line) => {
      lines.push(line.split('').map((char) => parseInt(char, 10)));
    });

    rl.on('close', () => {
      const answer = calculateOctopusEnergy(lines, steps);

      console.log(`For ${steps} steps, the answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
