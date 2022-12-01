import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { parseBrackets } from './bracket-parser';
import { calculateMedian } from '@advent-of-code/util-math';

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
      const parsed = lines.map((line) => parseBrackets(line));

      const scores = parsed
        .map((result) => {
          if (result.valid && !result.complete) {
            const points = result.autoComplete
              .split('')
              .reduce((totalPoints, bracket) => {
                const multiple = totalPoints * 5;

                switch (bracket) {
                  case ')':
                    return multiple + 1;
                  case ']':
                    return multiple + 2;
                  case '}':
                    return multiple + 3;
                  case '>':
                    return multiple + 4;
                  default:
                    return multiple;
                }
              }, 0);

            console.log(
              `${result.brackets} is completed by ${result.autoComplete} and scores ${points}`
            );

            return points;
          } else {
            return null;
          }
        })
        .filter((points) => points !== null);

      const answer = calculateMedian(scores);

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
