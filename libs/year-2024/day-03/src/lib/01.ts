import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    let input = "";

    rl.on('line', (line) => {
      input += line;
    });

    rl.on('close', () => {
      let answer = 0;

      for(const match of input.matchAll(/mul\((\d*),(\d*)\)/g)) {
        answer += parseInt(match[1],10) * parseInt(match[2],10);
      }

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
