import { scoreCard, scoreCardStack } from './cardScorer';

describe('scoreCard', () => {
  it('should score card', () => {
    const card = scoreCard('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53');

    expect(card.matchingNumbers.length).toEqual(4);
    expect(card.score).toEqual(8);
  });
});

describe('scoreCardStack', () => {
  it('should score a stack of cards', () => {
    const cards = [
      scoreCard('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'),
      scoreCard('Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19'),
      scoreCard('Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1'),
      scoreCard('Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83'),
      scoreCard('Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36'),
      scoreCard('Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'),
    ];

    const copies = scoreCardStack(cards);

    expect(copies[0]).toEqual(1);
    expect(copies[1]).toEqual(2);
    expect(copies[2]).toEqual(4);
    expect(copies[3]).toEqual(8);
    expect(copies[4]).toEqual(14);
    expect(copies[5]).toEqual(1);
  });
});
