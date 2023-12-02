import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import {
  calculateMonkeyBusiness,
  Monkey,
  parseMonkeyInput,
  runRoundOfMonkeys,
} from './shared';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    let monkeys: Record<number, Monkey> = {};
    let currentMonkeyInputs = [];

    rl.on('line', (line) => {
      if (line !== '') {
        currentMonkeyInputs.push(line);
      } else {
        const monkey = parseMonkeyInput(currentMonkeyInputs);
        monkeys[monkey.id] = monkey;
        currentMonkeyInputs = [];
      }
    });

    rl.on('close', () => {
      for (let i = 0; i < 20; i++) {
        monkeys = runRoundOfMonkeys(monkeys, (num) => Math.floor(num / 3));

        // Object.values(monkeys).forEach(monkey => console.log(monkey.id, monkey.items, monkey.itemsInspected))
      }
      const answer = calculateMonkeyBusiness(monkeys);

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
