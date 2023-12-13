import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import {createMatrix} from "@advent-of-code/util-arrays";
import {findFarthestPointInLoop} from "./pipes";

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const lines: string[][] = [];

    rl.on('line', (line) => {
      lines.push(line.split(""));
    });

    rl.on('close', () => {
      const pipes = createMatrix<string>(lines);
      const answer = findFarthestPointInLoop(pipes);

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
