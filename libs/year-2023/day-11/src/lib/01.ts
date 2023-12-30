import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { createMatrix } from '@advent-of-code/util-arrays';
import {
  expandGalaxy,
  findGalaxies,
  findShortestPathLengthBetweenGalaxies,
} from './galaxy';

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
      const galaxy = createMatrix<string>(lines);
      const expandedGalaxy = expandGalaxy(galaxy);
      const galaxies = findGalaxies(expandedGalaxy);
      const lengths = findShortestPathLengthBetweenGalaxies(galaxies);
      const answer = lengths.reduce((acc, cur) => acc + cur.length, 0);

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
