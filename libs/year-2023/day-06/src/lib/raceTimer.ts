export function getNumberOfPossibleWins({
  time,
  distance,
}: {
  time: number;
  distance: number;
}): number {
  let start: number;
  let end: number;

  // find start of wins
  for (let i = 1; i < time; i++) {
    if (i * (time - i) > distance) {
      start = i;
      break;
    }
  }

  // find end of wins
  for (let i = time - 1; i > 0; i--) {
    if (i * (time - i) > distance) {
      end = i;
      break;
    }
  }

  return end - start + 1;
}
