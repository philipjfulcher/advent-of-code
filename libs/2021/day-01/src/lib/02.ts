import { createReadStream } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const lines: number[] = [];

    rl.on('line', (line) => lines.push(parseInt(line, 10)));

    rl.on('close', () => {
      let increaseCount = 0;

      let previousTotal: number;

      lines.forEach((line, index) => {
        if (index < 2) {
          return;
        }

        const groupTotal = line + lines[index - 1] + lines[index - 2];

        if (previousTotal !== undefined) {
          if (groupTotal > previousTotal) {
            // console.log(`${groupTotal} (increased)`);
            increaseCount++;
          } else if (groupTotal === previousTotal) {
            // console.log(`${groupTotal} (no change)`);
          } else {
            // console.log(`${groupTotal} (decreased)`);
          }
          previousTotal = groupTotal;
        } else {
          // console.log(`${groupTotal} (N/A - no previous measurement)`);
          previousTotal = groupTotal;
        }
      });
      
      resolve(increaseCount);
    });
  });

  return promise;
}

async function run() {
  const answer = await calculateAnswer('input.txt');
  console.log(`The answer is ${answer}`);
}

// run();
