import { pairwise } from './pairwise';

describe('pairwise', () => {
  it('should return the array in pairs', () => {
    const arr = [0, 1, 2, 3, 4, 5];

    expect(pairwise(arr)).toEqual([
      [0, 1],
      [2, 3],
      [4, 5],
    ]);
  });
});
