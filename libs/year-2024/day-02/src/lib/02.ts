import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const reports: number[][] = [];

    rl.on('line', (line) => {
      reports.push(line.split(' ').map((num) => parseInt(num, 10)));
    });

    rl.on('close', () => {
      let safeReports = 0;

      reports.forEach((levels) => {
        let isSafe = isReportSafe(levels);

        if (!isSafe) {
          console.log(`${levels} has to be re-tested.`);

          for (let i = 0; i < levels.length; i++) {
            const levelsToTest = [...levels];
            levelsToTest.splice(i, 1);
            const subReportIsSafe = isReportSafe(levelsToTest);
            if (subReportIsSafe) {
              console.log(`${levelsToTest} is safe.`);
              isSafe = true;
            } else {
              console.log(`${levelsToTest} is unsafe.`);
            }
          }
        }

        if (isSafe) {
          console.log(`${levels} is safe.`);
          safeReports++;
        } else {
          console.log(`${levels} is unsafe.`);
        }
      });

      console.log(`The answer is ${safeReports}`);

      resolve(safeReports);
    });
  });

  return promise;
}

function isReportSafe(levels: number[]) {
  let isSafe = true;
  const incDec: 'inc' | 'dec' = levels[0] < levels[1] ? 'inc' : 'dec';

  levels.forEach((level, index) => {
    if (isSafe && index < levels.length) {
      if (incDec === 'inc') {
        const result = levels[index + 1] - level;

        if (result <= 0 || result > 3) {
          isSafe = false;
        }
      } else if (incDec === 'dec') {
        const result = level - levels[index + 1];

        if (result <= 0 || result > 3) {
          isSafe = false;
        }
      }
    }
  });

  return isSafe;
}
