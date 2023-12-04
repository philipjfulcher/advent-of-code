export function stringIsNumber(str: string) {
  return Number.isInteger(Number.parseInt(str, 10));
}
