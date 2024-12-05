import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { createMatrix } from '@advent-of-code/util-arrays';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const lines: string[][] = [];

    rl.on('line', (line) => {
      lines.push(line.split(''));
    });

    rl.on('close', () => {
      let matches = 0;

      const matrix = createMatrix<string>(lines);

      for (let row = 0; row < matrix.size().height; row++) {
        for (let col = 0; col < matrix.size().width; col++) {
          const center = matrix.getCellValue(row, col);
          const neighbors = matrix.getNeighborsForCell(row, col);

          if (center === 'A' && neighbors.length === 8) {
            const nw = neighbors.find(
              (neighbor) => neighbor.direction === 'nw'
            ).value;
            const ne = neighbors.find(
              (neighbor) => neighbor.direction === 'ne'
            ).value;
            const sw = neighbors.find(
              (neighbor) => neighbor.direction === 'sw'
            ).value;
            const se = neighbors.find(
              (neighbor) => neighbor.direction === 'se'
            ).value;

            const firstDiag = [nw, center, se].join('');
            const secondDiag = [ne, center, sw].join('');

            console.log({ firstDiag, secondDiag });

            if (
              (firstDiag === 'MAS' || firstDiag === 'SAM') &&
              (secondDiag === 'MAS' || secondDiag === 'SAM')
            ) {
              matches++;
            }
          }
        }
      }
      console.log(`The answer is ${matches}`);

      resolve(matches);
    });
  });

  return promise;
}
