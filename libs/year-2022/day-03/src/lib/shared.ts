export function decodeContents(contents: string): [string, string] {
  const halfway = contents.length / 2;
  return [contents.slice(0, halfway), contents.slice(halfway)];
}

export function findSharedContents(compartments: string[]) {
  return compartments[0]
    .split('')
    .find((item) =>
      compartments
        .slice(1)
        .every((compartment) => compartment.split('').includes(item))
    );
}

export function calculatePriority(char: string) {
  if (!char || char === '') return 0;
  let priority = 0;

  if (char === char.toUpperCase()) priority += 26;

  return char.toLowerCase().charCodeAt(0) - 96 + priority;
}
