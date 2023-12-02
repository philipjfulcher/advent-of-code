import {
  calculatePriority,
  decodeContents,
  findSharedContents,
} from './shared';

describe('decodeContents', () => {
  it('should decode', () => {
    expect(decodeContents('vJrwpWtwJgWrhcsFMMfFFhFp')).toEqual([
      'vJrwpWtwJgWr',
      'hcsFMMfFFhFp',
    ]);
  });
});

describe('findSharedContents', () => {
  it('should find shared char', () => {
    expect(findSharedContents(['vJrwpWtwJgWr', 'hcsFMMfFFhFp'])).toEqual('p');
    expect(
      findSharedContents([
        'vJrwpWtwJgWrhcsFMMfFFhFp',
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
        'PmmdzqPrVvPwwTWBwg',
      ])
    ).toEqual('r');
  });
});

describe('calcualtePriority', () => {
  it('should calcualte priority', () => {
    expect(calculatePriority('p')).toEqual(16);
  });
});
