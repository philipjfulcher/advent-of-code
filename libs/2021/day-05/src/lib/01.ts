import { createReadStream } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';
import { Grid } from './grid';
import { Line } from './interfaces';
import { parseLine } from './line-parser';

export async function calculateAnswer(
  fileName: string
): Promise<{ cellsWithCrossingLines: number; visualization: string }> {
  const promise = new Promise<{
    cellsWithCrossingLines: number;
    visualization: string;
  }>((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const lines: Line[] = [];

    rl.on('line', (inputLine) => {
      lines.push(parseLine(inputLine));
    });

    rl.on('close', () => {
      const grid = new Grid(lines);
      const visualization = grid.visualize();

      const cells = grid.matrix.data.flat();

      const cellsWithCrossingLines = cells.filter((cell) => cell > 1).length;
// console.log(visualization);
      resolve({ cellsWithCrossingLines, visualization });
    });
  });

  return promise;
}
