import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import {
  findContainedSet,
  parsePair,
  parseIdRange,
  findOverlappingSet,
} from './shared';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    let numOverlappedSets = 0;

    rl.on('line', (line) => {
      const pair = parsePair(line);
      if (findOverlappingSet(parseIdRange(pair[0]), parseIdRange(pair[1]))) {
        numOverlappedSets++;
      }
    });

    rl.on('close', () => {
      const answer = numOverlappedSets;

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
