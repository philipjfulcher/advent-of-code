export function intersection(arr1: number[], arr2: number[]): number[] {
  return arr1.filter((val1) => {
    return arr2.find((val2) => val1 === val2);
  });
}
