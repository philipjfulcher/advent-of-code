import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Sheet } from './sheet';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const coords: [number, number][] = [];
    const folds: { direction: 'x' | 'y'; val: number }[] = [];

    rl.on('line', (line) => {
      if (line.includes(',')) {
        const split = line.split(',', 2);
        const coord: [number, number] = [
          parseInt(split[0], 10),
          parseInt(split[1], 10),
        ];
        coords.push(coord);
      } else if (line !== '') {
        const lineSplit = line.split(' ');
        const instruction = lineSplit[2].split('=');

        folds.push({
          direction: instruction[0] as 'x' | 'y',
          val: parseInt(instruction[1], 10),
        });
      }
    });

    rl.on('close', () => {
      let maxRows = 0;
      let maxCols = 0;

      coords.forEach(([x, y]) => {
        if (x > maxCols) {
          maxCols = x;
        }

        if (y > maxRows) {
          maxRows = y;
        }
      });

      // const data = new Array(maxRows + 1).fill(
      //   [new Array(maxCols + 1).fill(false, 0)],
      //   0
      // );

      const data: boolean[][] = [];

      for (let row = 0; row <= maxRows; row++) {
        data.push([]);
        for (let col = 0; col <= maxCols; col++) {
          data[row].push(false);
        }
      }

      const sheet = new Sheet(data);
      // sheet.visualize();

      coords.forEach(([x, y]) => {
        sheet.mark(x, y);
        // sheet.visualize();
      });

      // sheet.visualize();

      folds.forEach(({ direction, val }) => {
        sheet.fold(direction, val);
      });

      sheet.visualize();

      const answer = sheet.countMarks();

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
