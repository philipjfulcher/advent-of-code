import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const elves: number[] = [];
    let currentElf = 1;
    let currentElfCalorieCount = 0;
    let currentHighCalorieCountElfId = currentElf;
    let currentHighCalorieCount = 0;

    rl.on('line', (line) => {
      if(line === "") {
        elves.push(currentElfCalorieCount);

        if(currentElfCalorieCount > currentHighCalorieCount) {
          currentHighCalorieCount = currentElfCalorieCount;
          currentHighCalorieCountElfId = currentElf;
        }
          currentElf++;
          currentElfCalorieCount = 0;
      } else {
        currentElfCalorieCount += Number.parseInt(line, 10);
      }
    });

    rl.on('close', () => {
      const answer = currentHighCalorieCount; 
      console.log(`The elf with the highest calorie count is elf ${currentHighCalorieCountElfId} with ${currentHighCalorieCount} calories.`)
      console.log(`The answer is ${answer}`); 

      resolve(answer);
    });
  });

  return promise;
}
