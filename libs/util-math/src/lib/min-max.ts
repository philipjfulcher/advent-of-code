export function calculateMin(numbers: number[]): number | null {
  return numbers.reduce<number | null>((acc, cur) => {
    if (acc === null) {
      return cur;
    } else if (cur < acc) {
      return cur;
    } else {
      return acc;
    }
  }, null);
}

