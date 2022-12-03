import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import {  playGame, calculateGameScore, decrypt } from './interfaces'
export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    let totalScore = 0;

    rl.on('line', (line) => {
      const codes = line.split(' ');
      const player = decrypt[codes[1]];
      const opponent = decrypt[codes[0]];
      const gamestate = playGame(player,opponent);
      const score = calculateGameScore(player,gamestate);
      totalScore += calculateGameScore(player,gamestate);
    });

    rl.on('close', () => {
      const answer = totalScore;

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
