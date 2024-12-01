import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const left: number[] = [];
    const right: number[] = [];

    rl.on('line', (line) => {
      const columns = line.split('   ');
      left.push(parseInt(columns[0], 10));
      right.push(parseInt(columns[1], 10));
    });

    rl.on('close', () => {
      console.log({left,right})
      left.sort((a, b) => a - b);
      right.sort((a, b) => a - b);

      let answer = 0;

      left.forEach((val,index) => {
        console.log({left,right:right[index]})
        if(val > right[index]) {
          answer += val - right[index];
        } else {
          answer += right[index] - val;
        }
      })

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
