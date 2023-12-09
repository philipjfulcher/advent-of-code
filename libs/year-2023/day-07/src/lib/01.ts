import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { rankHands } from './cards';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const hands = new Map<string, number>();

    rl.on('line', (line) => {
      const [hand, bid] = line.split(' ');
      hands.set(hand, parseInt(bid, 10));
    });

    rl.on('close', () => {
      const rankedHands = rankHands([...hands.keys()]);
      rankedHands.reverse();

      const answer = rankedHands.reduce((acc, cur, index) => {
        return acc + hands.get(cur) * (index + 1);
      }, 0);

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
