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

    let topThreeElves: {id: number, calories: number}[] = [];

    rl.on('line', (line) => {
      if(line === "") {
        elves.push(currentElfCalorieCount);

        if(topThreeElves.length < 3 || currentElfCalorieCount > topThreeElves[2].calories) {
          topThreeElves.push({id: currentElf, calories: currentElfCalorieCount});
          topThreeElves =  topThreeElves.sort( (a,b) => b.calories - a.calories).slice(0,3)
        }

          currentElf++;
          currentElfCalorieCount = 0;
      } else {
        currentElfCalorieCount += Number.parseInt(line, 10);
      }
    });

    rl.on('close', () => {
      const answer = topThreeElves.reduce( (acc,cur) => acc += cur.calories, 0); 
      console.log(`The elf with the highest calorie count is elf ${topThreeElves[0].id} with ${topThreeElves[0].calories} calories.`)
      console.log(`The elf with the second highest calorie count is elf ${topThreeElves[1].id} with ${topThreeElves[1].calories} calories.`)
      console.log(`The elf with the third highest calorie count is elf ${topThreeElves[2].id} with ${topThreeElves[2].calories} calories.`)
      console.log(`The answer is ${answer}`); 

      resolve(answer);
    });
  });

  return promise;
}
