import { findLcf, followDirections, followGhostDirections } from './maps';

describe('followDirections', () => {
  it('shoudl follow simple directions', () => {
    const directions = 'RL';
    const map = new Map<string, [string, string]>();

    map.set('AAA', ['BBB', 'CCC']);
    map.set('BBB', ['DDD', 'EEE']);
    map.set('CCC', ['ZZZ', 'GGG']);
    map.set('DDD', ['DDD', 'DDD']);
    map.set('EEE', ['EEE', 'EEE']);
    map.set('GGG', ['GGG', 'GGG']);
    map.set('ZZZ', ['ZZZ', 'ZZZ']);

    expect(followDirections(map, directions)).toEqual(2);
  });

  it('should follow complex directions', () => {
    const directions = 'LLR';
    const map = new Map<string, [string, string]>();

    map.set('AAA', ['BBB', 'BBB']);
    map.set('BBB', ['AAA', 'ZZZ']);
    map.set('ZZZ', ['ZZZ', 'ZZZ']);

    expect(followDirections(map, directions)).toEqual(6);
  });

  it('should follow ghost instructions', () => {
    const directions = 'LR';
    const map = new Map<string, [string, string]>();

    map.set('11A', ['11B', 'XXX']);
    map.set('11B', ['XXX', '11Z']);
    map.set('11Z', ['11B', 'XXX']);
    map.set('22A', ['22B', 'XXX']);
    map.set('22B', ['22C', '22C']);
    map.set('22C', ['22Z', '22Z']);
    map.set('22Z', ['22B', '22B']);
    map.set('XXX', ['XXX', 'XXX']);

    expect(followGhostDirections(map, directions)).toEqual(6);
  });
});

describe('findLcf', () => {
  it('should find the least common factor', () => {
    expect(findLcf([3, 4, 6])).toEqual(12);
    expect(findLcf([2, 3])).toEqual(6);
    expect(findLcf([8, 9, 21])).toEqual(504);
  });
});
