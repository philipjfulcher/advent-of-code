import { intersection } from '@advent-of-code/util-arrays';

export interface Card {
  id: string;
  winningNumbers: string[];
  yourNumbers: string[];
  matchingNumbers: string[];
  score: number;
}

export function scoreCard(card: string): Card {
  const split = card.split(': ');
  const id = split[0];
  const numberLists = split[1].split(' | ');

  const winningNumbers = numberLists[0].split(' ');
  const yourNumbers = numberLists[1].split(' ');
  const matchingNumbers = intersection(winningNumbers, yourNumbers);

  const score = matchingNumbers.reduce((acc) => (acc === 0 ? 1 : acc * 2), 0);
  return {
    id,
    winningNumbers,
    yourNumbers,
    matchingNumbers,
    score,
  };
}

export function scoreCardStack(cards: Card[]) {
  const copies: number[] = new Array(cards.length).fill(1);

  cards.forEach((card, cardIndex) => {
    // console.log(`${cardIndex} has ${card.matchingNumbers.length} matching numbers`)
    for (let numCopies = 0; numCopies < copies[cardIndex]; numCopies++) {
      for (let i = 1; i <= card.matchingNumbers.length; i++) {
        // console.log(`Adding a copy to ${cardIndex + i}`);
        copies[cardIndex + i]++;
      }
    }
  });

  return copies;
}
