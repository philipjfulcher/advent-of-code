import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const rules: Record<string, string[]> = {};
    const updates: string[][] = [];

    rl.on('line', (line) => {
      if (line.includes('|')) {
        const [before, after] = line.split('|');
        if (rules[before]) {
          rules[before].push(after);
        } else {
          rules[before] = [after];
        }
      } else if (line !== '') {
        updates.push(line.split(','));
      }
    });

    rl.on('close', () => {
      const validatedUpdates = updates.map((update) =>
        isUpdateValid(update, rules)
      );
      const answer = validatedUpdates
        .filter((update) => update.valid)
        .map((update) => findMiddlePage(update.update))
        .reduce((acc, cur) => acc + Number.parseInt(cur, 10), 0);

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}

function isUpdateValid(update: string[], rules: Record<string, string[]>) {
  const violatedRules: [string, string][] = [];

  update.forEach((entry, entryIndex) => {
    const rule = rules[entry];
    if (rule) {
      update.forEach((toTest, toTestIndex) => {
        if (
          toTest !== entry &&
          rule.includes(toTest) &&
          entryIndex > toTestIndex
        ) {
          violatedRules.push([entry, toTest]);
        }
      });
    }
  });

  // violatedRules.forEach(violation => {
  //   console.log(`${update} violates rules ${violation.join('|')}`)
  //
  // })
  //
  // if (violatedRules.length === 0) {
  //   console.log(`${update} is valid`);
  // }

  return { update, valid: violatedRules.length === 0, violatedRules };
}

function findMiddlePage(update: string[]) {
  const middleIndex = Math.ceil(update.length / 2);
  return update[middleIndex - 1];
}
