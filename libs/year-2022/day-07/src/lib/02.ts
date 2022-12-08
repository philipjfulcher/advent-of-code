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

      const answer = Object.values(fileSizes)
        .sort((a, b) => a - b)
        .find((filesize) => {
          return 70000000 - fileSizes['/'] + filesize >= 30000000;
        });

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
