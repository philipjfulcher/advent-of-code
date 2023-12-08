import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { getNumberOfPossibleWins } from './raceTimer';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const lines: string[] = [];

    rl.on('line', (line) => {
      lines.push(line);
    });

    rl.on('close', () => {
      const time = Number.parseInt(
        lines[0].split(':')[1].trim().replaceAll(' ', ''),
        10
      );
      const distance = Number.parseInt(
        lines[1].split(':')[1].trim().replaceAll(' ', ''),
        10
      );

      // console.log(possibleWins)
      const answer = getNumberOfPossibleWins({ time, distance });

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
