import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { parseBrackets } from './bracket-parser';

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

      const answer = parsed.reduce((acc, cur) => {
        switch (cur.firstInvalidBracket) {
          case ')':
            return acc + 3;
          case ']':
            return acc + 57;
          case '}':
            return acc + 1197;
          case '>':
            return acc + 25137;
          default:
            return acc;
        }
      }, 0);

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
