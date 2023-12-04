import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Card, scoreCard } from './cardScorer';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const cards: Card[] = [];

    rl.on('line', (line) => {
      cards.push(scoreCard(line));
    });

    rl.on('close', () => {
      const answer = cards.reduce((acc, cur) => acc + cur.score, 0);

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
