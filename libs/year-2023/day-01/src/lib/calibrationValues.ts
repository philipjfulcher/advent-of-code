const numberStringValue = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
export function findCalibrationValue(value: string, parseStrings: boolean) {
  const regex = parseStrings
    ? /[0-9]|one|two|three|four|five|six|seven|eight|nine/g
    : /[0-9]/g;
  const numbers = [...value.matchAll(regex)].map((val) => {
    if (val.toString().length > 1) {
      return numberStringValue[val.toString()];
    } else {
      return val;
    }
  });

  return Number.parseInt(`${numbers.at(0)}${numbers.at(-1)}`, 10);
}
