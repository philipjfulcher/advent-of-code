import { calculateAnswer } from './01';

export async function runPuzzle() {
  const answer = await calculateAnswer('input.txt');
  console.log(`The answer is ${answer}`);
}

runPuzzle();
