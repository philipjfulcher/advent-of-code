import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { HeightMap } from './height-map';

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
      const data = lines.map((line) =>
        line.split('').map((char) => parseInt(char, 10))
      );
      const heightMap = new HeightMap(data);

      const answer = heightMap.calculateBasins();

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
