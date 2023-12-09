import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { followDirections } from './maps';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    let directions: string;
    const map = new Map<string, [string, string]>();

    rl.on('line', (line) => {
      if (!directions) {
        directions = line;
      } else if (line !== '') {
        const matches = line.match(/([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/);
        map.set(matches[1], [matches[2], matches[3]]);
      }
    });

    rl.on('close', () => {
      const answer = followDirections(map, directions);

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
