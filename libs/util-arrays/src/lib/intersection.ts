export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter((val1) => {
    return arr2.find((val2) => val1 === val2);
  });
}
