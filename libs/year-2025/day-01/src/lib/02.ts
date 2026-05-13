import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';

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
        const result = turnDialAndCountRefactor(cur, dir, dist);

        cur = result[0];
        answer += result[1];
      });

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}

export function turnDialAndCount(
  start: number,
  direction: string,
  distance: number,
  min = 0,
  max = 99
) {
  console.log(start, direction, distance);
  let end = direction === 'R' ? start + distance : start - distance;
  let passedZero = 0;

  console.log(`On ${end}`);

  while (end < min) {
    passedZero++;

    end += max + 1;
    console.log(`On ${end}`);
  }

  while (end > max) {
    passedZero++;

    end = min + (end - max) + 1;
    console.log(`On ${end}`);
  }

  console.log(`Passed zero ${passedZero} times.`);

  return [end, passedZero];
}

export function turnDialAndCountRefactor(
  start: number,
  direction: string,
  distance: number,
  min = 0,
  max = 99
) {
  let passedZero = 0;
  let end = start;

  if (direction === 'R') {
    for (let i = 0; i < distance; i++) {
      end++;

      if (end > max) {
        end = min;
      }

      if (end === 0) {
        passedZero++;
      }
    }
  } else if (direction === 'L') {
    for (let i = 0; i < distance; i++) {
      end--;

      if (end === 0) {
        passedZero++;
      }

      if (end < min) {
        end = max;
      }
    }
  }

  return [end, passedZero];
}
