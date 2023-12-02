import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import {
  Bag,
  isGamePossible,
  minimumBagForGame,
  parseGame,
} from './gameParser';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const minBags: Bag[] = [];

    rl.on('line', (line) => {
      const game = parseGame(line);
      const minBag = minimumBagForGame(game);
      minBags.push(minBag);
    });

    rl.on('close', () => {
      const answer = minBags.reduce(
        (acc, cur) => acc + cur.green * cur.red * cur.blue,
        0
      );

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
