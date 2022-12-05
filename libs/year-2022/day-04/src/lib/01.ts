import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { findContainedSet, parsePair, parseIdRange } from './shared';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    let numContainedSets = 0;

    rl.on('line', (line) => {
      const pair = parsePair(line);
      if (findContainedSet(parseIdRange(pair[0]), parseIdRange(pair[1]))) {
        numContainedSets++;
      }
    });

    rl.on('close', () => {
      const answer = numContainedSets;

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
