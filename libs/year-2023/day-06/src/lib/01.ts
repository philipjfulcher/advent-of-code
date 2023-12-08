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
      const times = lines[0]
        .split(':')[1]
        .trim()
        .replaceAll(/ +/g, ' ')
        .split(' ')
        .map((str) => Number.parseInt(str, 10));
      const distances = lines[1]
        .split(':')[1]
        .trim()
        .replaceAll(/ +/g, ' ')
        .split(' ')
        .map((str) => Number.parseInt(str, 10));

      const possibleWins: number[] = times.map((time, index) =>
        getNumberOfPossibleWins({ time, distance: distances[index] })
      );
      // console.log(possibleWins)
      const answer = possibleWins.reduce((acc, cur) => acc * cur, 1);

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
