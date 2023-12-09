const cardLabels = [
  'A',
  'K',
  'Q',
  'J',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
];
const cardLabelsWithJoker = [
  'A',
  'K',
  'Q',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  'J',
];

type HandType =
  | 'five-of-a-kind'
  | 'four-of-a-kind'
  | 'full-house'
  | 'three-of-a-kind'
  | 'two-pair'
  | 'one-pair'
  | 'high-card';

const handTypes: HandType[] = [
  'five-of-a-kind',
  'four-of-a-kind',
  'full-house',
  'three-of-a-kind',
  'two-pair',
  'one-pair',
  'high-card',
];

export function getTypeOfHand(cardsStr: string, jokerfied = false): HandType {
  const cards = cardsStr.split('');
  const cardCounts: Record<string, number> = {};

  cards.forEach((card) => {
    if (cardCounts[card]) {
      cardCounts[card]++;
    } else {
      cardCounts[card] = 1;
    }
  });

  let sortedCardCounts = Object.entries(cardCounts).sort((a, b) => b[1] - a[1]);

  if (jokerfied) {
    const joker = sortedCardCounts.find((card) => card[0] === 'J');

    if (joker) {
      const jokerCount = joker[1];

      if (jokerCount === 5) {
        sortedCardCounts = [['A', 5]];
      } else {
        sortedCardCounts = sortedCardCounts.filter(([card]) => card !== 'J');
        sortedCardCounts[0] = [
          sortedCardCounts[0][0],
          sortedCardCounts[0][1] + jokerCount,
        ];
      }
    }
  }

  if (sortedCardCounts[0][1] === 5) {
    return 'five-of-a-kind';
  } else if (sortedCardCounts[0][1] === 4) {
    return 'four-of-a-kind';
  } else if (sortedCardCounts[0][1] === 3 && sortedCardCounts[1][1] === 2) {
    return 'full-house';
  } else if (sortedCardCounts[0][1] === 3) {
    return 'three-of-a-kind';
  } else if (sortedCardCounts[0][1] === 2 && sortedCardCounts[1][1] === 2) {
    return 'two-pair';
  } else if (sortedCardCounts[0][1] === 2) {
    return 'one-pair';
  } else {
    return 'high-card';
  }
}

export function rankHands(hands: string[], jokerfied = false) {
  const types = hands.map((hand) => [hand, getTypeOfHand(hand, jokerfied)]);

  return types
    .sort((a, b) => {
      if (a[1] !== b[1]) {
        return (
          handTypes.indexOf(a[1] as HandType) -
          handTypes.indexOf(b[1] as HandType)
        );
      } else {
        return breakTie(a[0], b[0], jokerfied);
      }
    })
    .map(([hand]) => hand);
}

export function breakTie(a: string, b: string, jokerfied = false) {
  if (a[0] !== b[0]) {
    return rankCards(a[0], b[0], jokerfied);
  } else {
    return breakTie(a.slice(1), b.slice(1), jokerfied);
  }
}

export function rankCards(a: string, b: string, jokerfied = false) {
  const labels = jokerfied ? cardLabelsWithJoker : cardLabels;
  return labels.indexOf(a) - labels.indexOf(b);
}
