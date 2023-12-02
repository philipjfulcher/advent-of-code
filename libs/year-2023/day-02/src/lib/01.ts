import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Bag, isGamePossible, parseGame } from './gameParser';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const possibleGames: number[] = [];
    const bag: Bag = { red: 12, green: 13, blue: 14 };

    rl.on('line', (line) => {
      const game = parseGame(line);

      if (isGamePossible(bag, game)) {
        possibleGames.push(parseInt(game.id, 10));
      }
    });

    rl.on('close', () => {
      const answer = possibleGames.reduce((acc, cur) => acc + cur, 0);

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
