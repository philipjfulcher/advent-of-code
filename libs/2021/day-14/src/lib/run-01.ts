import { calculateAnswer } from './01';

export async function runPuzzle() {
  const answer = await (await calculateAnswer('test-input.txt', 10)).answer;
  console.log(`The answer is ${answer}`);
}

runPuzzle();
