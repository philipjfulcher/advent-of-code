import { arrayMinMax, MinMax } from '@advent-of-code/util-arrays';

export function processPolymer(
  template: string,
  rules: Map<string, string>,
  steps: number
) {
  // init pair counter
  let pairCounter: Record<string, number> = {};

  template.split('').forEach((char, index) => {
    if (index < template.length - 1) {
      const pair = char + template[index + 1];
      pairCounter[pair] = (pairCounter[pair] ?? 0) + 1;
    }
  });

  for (let step = 1; step <= steps; step++) {
    const newPairCounter: Record<string, number> = {};

    // const time = Date.now();
    console.log(`Starting step ${step}`);
    for (const pair in pairCounter) {
      if (rules.has(pair)) {
        const rule = rules.get(pair);

        const leftPair = pair[0] + rule;
        const rightPair = rule + pair[1];
        // console.log(`${pair} becomes ${leftPair} and ${rightPair}`);

        // newPairCounter[leftPair] = (pairCounter[leftPair] ?? 0) + 1;
        // newPairCounter[rightPair] = (pairCounter[rightPair] ?? 0) + 1;
        newPairCounter[leftPair] =
          (newPairCounter[leftPair] ?? 0) + pairCounter[pair];
        newPairCounter[rightPair] =
          (newPairCounter[rightPair] ?? 0) + pairCounter[pair];
      } else {
        newPairCounter[pair] = pairCounter[pair];
      }
    }
    console.log(pairCounter);
    pairCounter = newPairCounter;
    // console.log(`Step ${step} took ${Date.now() - time}ms`);
  }

  const charCounter: Record<string, number> = {
    [template[0]]: 1,
  };

  for (const pair in pairCounter) {
    charCounter[pair[1]] = (charCounter[pair[1]] ?? 0) + pairCounter[pair];
  }

  const minMax: MinMax = {
    max: '',
    min: '',
    minCount: 0,
    maxCount: 0,
  };

  let length = 0;

  for (const char in charCounter) {
    if (minMax.max === '' || charCounter[char] > minMax.maxCount) {
      minMax.max = char;
      minMax.maxCount = charCounter[char];
    }

    if (minMax.min === '' || charCounter[char] < minMax.minCount) {
      minMax.min = char;
      minMax.minCount = charCounter[char];
    }

    length += charCounter[char];
  }

  // console.log(chars.join(''));

  return {
    length,
    minMax,
  };
}

//trying to beat 775ms
