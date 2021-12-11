export function calculateMode(numbers: number[]): number | null {
  const numbersCount = numbers.reduce<{ [key: number]: number }>(
    (counter, val) => {
      if (counter[val] === undefined) {
        counter[val] = 1;
      } else {
        counter[val]++;
      }

      return counter;
    },
    {}
  );

  let highCount = 0;
  let mode: number | null = null;

  for (const key in numbersCount) {
    const count = numbersCount[key];
    if (mode === null || count > highCount) {
      mode = parseInt(key, 10);
      highCount = count;
    }
  }

  return mode ?? null;
}

export function calculateMedian(numbers: number[]): number | null {
  const sortedNumbers = [...numbers].sort((a, b) => a - b);

  const midPoint = sortedNumbers.length / 2;

  if (sortedNumbers.length % 2 === 0) {
    const low = midPoint - 1;
    const high = midPoint;

    return calculateMean([sortedNumbers[low], sortedNumbers[high]]);
  } else {
    return sortedNumbers[Math.floor(midPoint)];
  }
}

export function calculateMean(numbers: number[]): number {
  return numbers.reduce((cur, acc) => acc + cur, 0) / numbers.length;
}
