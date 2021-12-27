export interface MinMax {
  min: string;
  minCount: number;
  max: string;
  maxCount: number;
}

export function arrayMinMax(arr: Array<string | number>): MinMax {
  const minMax: MinMax = {
    max: '',
    min: '',
    minCount: 0,
    maxCount: 0,
  };

  arr.reduce<{ [key: string | number]: number }>(
    (counter, val) => {
      if (counter[val] === undefined) {
        counter[val] = 1;
      } else {
        counter[val]++;
      }

      if (minMax.max === '' || counter[val] > minMax.maxCount) {
        minMax.max = val.toString();
        minMax.maxCount = counter[val];
      }

      if (minMax.min === '' || counter[val] < minMax.minCount) {
        minMax.min = val.toString();
        minMax.minCount = counter[val];
      }

      return counter;
    },
    {}
  );

  return minMax;
}
