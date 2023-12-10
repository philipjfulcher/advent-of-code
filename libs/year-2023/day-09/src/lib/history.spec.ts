import { findNextValue, findPreviousValue } from './history';

describe('history', () => {
  it('should get next value', () => {
    expect(findNextValue([0, 3, 6, 9, 12, 15])).toEqual(18);
    expect(findNextValue([1, 3, 6, 10, 15, 21])).toEqual(28);
    expect(findNextValue([10, 13, 16, 21, 30, 45])).toEqual(68);
  });

  it('should find previous value', () => {
    expect(findPreviousValue([10, 13, 16, 21, 30, 45])).toEqual(5);
  });
});
