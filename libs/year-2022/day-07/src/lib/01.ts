import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileTree } from './shared';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const lines: string[] = [];

    rl.on('line', (line) => {
      lines.push(line);
    });

    rl.on('close', () => {
      const fileTree = new FileTree(lines);
      const fileSizes = fileTree.calculateAllDirectorySizes();

      const answer = Object.values(fileSizes).reduce((acc, cur) => {
        if (cur <= 100000) {
          acc += cur;
        }

        return acc;
      }, 0);

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
