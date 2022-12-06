import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import {
  getTopOfEachStack,
  parseMoveLines,
  parseStackLines,
  performMoves,
} from './shared';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const stackLines: string[] = [];
    const moveLines: string[] = [];
    let stackLinesDone = false;

    rl.on('line', (line) => {
      if (line === '') {
        stackLinesDone = true;
      } else if (!stackLinesDone) {
        stackLines.push(line);
      } else {
        moveLines.push(line);
      }
    });

    rl.on('close', () => {
      const parsedStackLines = parseStackLines(stackLines);
      const parsedMoveLines = parseMoveLines(moveLines);
      const movedStacks = performMoves(parsedStackLines, parsedMoveLines, true);
      const answer = getTopOfEachStack(movedStacks).join('');

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
