import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';

type direction = 'L' | 'R';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const lines: [string, number][] = [];

    rl.on('line', (line) => {
      const direction = line.charAt(0);
      const num = Number.parseInt(line.slice(1));
      lines.push([direction, num]);
    });

    rl.on('close', () => {
      let answer = 0;
      let cur = 50;

      lines.forEach(([dir, dist]) => {
        cur = turnDial(cur, dir, dist);
        if (cur === 0) {
          answer++;
        }
      });

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}

export function turnDial(
  start: number,
  direction: string,
  distance: number,
  min = 0,
  max = 99
) {
  let end = direction === 'R' ? start + distance : start - distance;

  while (end < min) {
    end += max + 1;
  }

  while (end > max) {
    end = min + (end - max) - 1;
  }

  return end;
}
