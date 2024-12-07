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

      matrix.getRows().forEach((row) => {
        matches += [...row.join('').matchAll(/XMAS/g)].length;
        matches += [...row.join('').matchAll(/SAMX/g)].length;
      });

      matrix.getColumns().forEach((col) => {
        matches += [...col.join('').matchAll(/XMAS/g)].length;
        matches += [...col.join('').matchAll(/SAMX/g)].length;
      });

      matrix.getDiagonals().forEach((diagonal) => {
        matches += [...diagonal.join('').matchAll(/XMAS/g)].length;
        matches += [...diagonal.join('').matchAll(/SAMX/g)].length;
      });

      console.log(`The answer is ${matches}`);

      resolve(matches);
    });
  });

  return promise;
}
