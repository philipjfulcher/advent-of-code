import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { calculatePriority, findSharedContents } from './shared';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    let total = 0;
    let currentGroup: string[] = [];

    rl.on('line', (line) => {
      currentGroup.push(line);

      if (currentGroup.length === 3) {
        total += calculatePriority(findSharedContents(currentGroup));
        currentGroup = [];
      }
    });

    rl.on('close', () => {
      const answer = total;

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
