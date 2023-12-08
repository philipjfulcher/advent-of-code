import {createInterface} from 'readline';
import {createReadStream} from 'fs';
import {join} from 'path';
import {followMaps, parseAlmanacLines} from "./almanac";

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const maps: [number,number,number][][] = [];
    let currentLines = [];
    let seeds: string[];

    rl.on('line', (line) => {
      if (line.startsWith('seeds: ')) {
        seeds = line.split(": ")[1].split(" ");
      }

      else if (line.endsWith(" map:") && currentLines.length !== 0) {

        maps.push(parseAlmanacLines(currentLines));

        currentLines = []
      }

      else if (line !== "") {
        currentLines.push(line);
      }
    });

    rl.on('close', () => {
      maps.push(parseAlmanacLines(currentLines));

      const locations = seeds.map(seed => followMaps(maps, Number.parseInt(seed)));
      const answer = Math.min(...locations);

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
