export function parseIdRange(range: string): number[] {
  const split = range.split('-');
  const result: number[] = [];

  for (
    let i = Number.parseInt(split[0], 10);
    i <= Number.parseInt(split[1], 10);
    i++
  ) {
    result.push(i);
  }

  return result;
}

export function parsePair(pair: string): string[] {
  return pair.split(',');
}

export function findContainedSet(a: number[], b: number[]) {
  const aMin = Math.min(...a);
  const bMin = Math.min(...b);
  const aMax = Math.max(...a);
  const bMax = Math.max(...b);
  return (aMin <= bMin && aMax >= bMax) || (bMin <= aMin && bMax >= aMax);
}

export function findOverlappingSet(a: number[], b: number[]) {
  const aMin = Math.min(...a);
  const bMin = Math.min(...b);
  const aMax = Math.max(...a);
  const bMax = Math.max(...b);
  return (
    findContainedSet(a, b) ||
    (aMin <= bMin && aMax >= bMin && aMax <= bMax) ||
    (bMin <= aMin && bMax >= aMin && bMax <= aMax)
  );
}
