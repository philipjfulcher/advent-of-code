import {
  expandGalaxy,
  findGalaxies,
  findLength,
  findShortestPathLengthBetweenGalaxies,
} from './galaxy';
import { createMatrix, Matrix } from '@advent-of-code/util-arrays';

describe('galaxy', () => {
  it('should expand galaxies', () => {
    const galaxy = createMatrix<string>([
      ['.', '.', '.', '#', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
      ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'],
      ['.', '#', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
      ['#', '.', '.', '.', '#', '.', '.', '.', '.', '.'],
    ]);
    const expandedGalaxy = expandGalaxy(galaxy);

    expect(expandedGalaxy.size()).toEqual({ width: 13, height: 12 });
  });

  it('should find lengths between pairs of galaxies', () => {
    const galaxy = createMatrix<string>([
      ['.', '.', '.', '#', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
      ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'],
      ['.', '#', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
      ['#', '.', '.', '.', '#', '.', '.', '.', '.', '.'],
    ]);
    const expandedGalaxy = expandGalaxy(galaxy);
    const galaxies = findGalaxies(expandedGalaxy);
    const lengths = findShortestPathLengthBetweenGalaxies(galaxies);

    // expect(lengths).toContain<{ from: number, to: number, length: number }>({from: 0, to: 6, length: 15})
    // expect(lengths).toContain<{ from: number, to: number, length: number }>({from: 2, to: 5, length: 17})
    // expect(lengths).toContain<{ from: number, to: number, length: number }>({from: 7, to: 8, length: 5})
    expect(lengths.length).toEqual(36);
    expect(lengths.reduce((acc, cur) => acc + cur.length, 0)).toEqual(374);
  });
});

// Between galaxy 1 and galaxy 7: 15
// Between galaxy 3 and galaxy 6: 17
// Between galaxy 8 and galaxy 9: 5
