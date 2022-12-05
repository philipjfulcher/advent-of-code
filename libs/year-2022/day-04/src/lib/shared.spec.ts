import { findContainedSet, findOverlappingSet, parseIdRange } from './shared';

describe('parseIdRange', () => {
  it('should parse id range', () => {
    expect(parseIdRange('1-3')).toEqual([1, 2, 3]);
    expect(parseIdRange('2-4')).toEqual([2, 3, 4]);
    expect(parseIdRange('7-8')).toEqual([7, 8]);
  });
});

describe('findContainedSet', () => {
  it('should find contained range', () => {
    expect(findContainedSet([1, 2, 3, 4], [2, 3])).toEqual(true);
    expect(findContainedSet([2, 3], [1, 2, 3, 4])).toEqual(true);
    expect(findContainedSet([2, 3], [4, 5, 6, 7])).toEqual(false);
    expect(findContainedSet([4, 5, 6, 7], [2, 3])).toEqual(false);
    expect(findContainedSet([2, 3, 4, 5, 6, 7, 8], [3, 4, 5, 6, 7])).toEqual(
      true
    );
    expect(findContainedSet([6], [4, 5, 6])).toEqual(true);
  });
});

describe('findOverlappingSet', () => {
  it('should find overlapping set', () => {
    expect(findOverlappingSet([1, 2], [2, 3])).toEqual(true);
    expect(findOverlappingSet([2, 3], [1, 2])).toEqual(true);
    expect(findOverlappingSet([5, 6, 7], [7, 8, 9])).toEqual(true);
    expect(findOverlappingSet([2, 3, 4, 5, 6, 7, 8], [3, 4, 5, 6, 7])).toEqual(
      true
    );
    expect(findOverlappingSet([6], [4, 5, 6])).toEqual(true);
    expect(findOverlappingSet([2, 3, 4], [6, 7, 8])).toEqual(false);
  });
});
