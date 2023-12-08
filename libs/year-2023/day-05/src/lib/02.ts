import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import {
  followMaps,
  getBucketForKey,
  parseAlmanacLines,
  reverseFollowMaps,
} from './almanac';
import { pairwise } from '@advent-of-code/util-arrays';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const maps: [number, number, number][][] = [];
    let currentLines = [];
    let seeds: string[];

    rl.on('line', (line) => {
      if (line.startsWith('seeds: ')) {
        seeds = line.split(': ')[1].split(' ');
      } else if (line.endsWith(' map:') && currentLines.length !== 0) {
        maps.push(parseAlmanacLines(currentLines));

        currentLines = [];
      } else if (line !== '') {
        currentLines.push(line);
      }
    });

    rl.on('close', () => {
      maps.push(parseAlmanacLines(currentLines));
      maps.reverse();

      let minLocation: number = Infinity;
      const seedRanges = pairwise(seeds).map((seedRange) => [
        Number.parseInt(seedRange[0], 10),
        Number.parseInt(seedRange[0], 10) + Number.parseInt(seedRange[1]) - 1,
      ]);
      const minSeed = Math.min(...seedRanges.map((seedRange) => seedRange[0]));
      const maxSeed = Math.max(...seedRanges.map((seedRange) => seedRange[1]));

      let loops = 0;
      let increment = Math.ceil((maxSeed - minSeed) / 100);

      do {
        for (let i = 0; i < minLocation; i += increment) {
          const seed = reverseFollowMaps(maps, i);

          const seedInRange = seedRanges.findIndex(
            ([start, end]) => seed >= start && seed <= end
          );

          if (seedInRange > -1 && i < minLocation) {
            minLocation = i;
          }
        }

        if (increment === 1) {
          increment = 0;
        } else {
          increment = Math.ceil(minLocation / 100 - loops * 1000);
          if (increment < 1) {
            increment = 1;
          }
        }

        loops++;
      } while (increment >= 1);

      console.log(`The answer is ${minLocation}`);

      resolve(minLocation);
    });
  });

  return promise;
}
