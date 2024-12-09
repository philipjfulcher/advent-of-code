import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import {createMatrix} from "@advent-of-code/util-arrays";

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const mapData: string[][] = [];

    rl.on('line', (line) => {
      mapData.push(line.split(''));
    });

    rl.on('close', () => {
      const map = createMatrix<string>(mapData);
      let now = Date.now();
      let currentCell = map.filter((row,col,value) => value === '^')[0];

      console.log(`Took ${Date.now()-now}ms to find current cell`);
      now = Date.now();

      const rotationOrder: ('n' | 's' | 'e' |'w')[] = ['n','e','s','w']
      let currentDirection = 0;

      while(currentCell !== null) {
        const neighbors = map.getNeighborsForCell(currentCell.row,currentCell.col);
        const nextCell = neighbors.find(neighbor => neighbor.direction === rotationOrder[currentDirection % 4]);
        if(nextCell === undefined) {
          map.setCellValue(currentCell.row,currentCell.col,'X');
          currentCell = null;
        } else if(nextCell?.value !== '#') {
          map.setCellValue(nextCell.row,nextCell.col,'^');
          map.setCellValue(currentCell.row,currentCell.col,'X');
          currentCell = nextCell;
        } else {
          currentDirection++;
        }
      }

      const answer = map.filter((row,col,value) => value === 'X').length;
      console.log(`Took ${Date.now() - now}ms to solve`)
      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
