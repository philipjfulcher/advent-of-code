import { calculateAnswer } from './02';

export async function runPuzzle() {
  const answer = await calculateAnswer('input.txt');
  console.log(`The answer is ${answer}`);
}

runPuzzle();
