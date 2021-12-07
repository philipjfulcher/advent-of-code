import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const lines: number[] = [];

    rl.on('line', (line) => {
      console.log(line);
      lines.push(parseInt(line, 10));
    });

    rl.on('close', () => {
      console.log(lines);
      let increaseCount = 0;

      lines.forEach((line, index) => {
        const prevLine = lines[index - 1];

        if (prevLine) {
          if (line > prevLine) {
            console.log(`${line} (increased)`);
            increaseCount++;
          } else {
            console.log(`${line} (decreased)`);
          }
        } else {
          console.log(`${line} (N/A - no previous measurement)`);
        }
      });

      resolve(increaseCount);
    });
  });

  return promise;
}

export async function run() {
  const increaseCount = await calculateAnswer('input.txt');

  console.log(
    `There are ${increaseCount} measurements that are larger than the previous measurement`
  );
}

// run();
