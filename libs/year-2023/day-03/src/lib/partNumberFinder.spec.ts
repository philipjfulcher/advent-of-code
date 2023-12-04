import { createMatrix } from '@advent-of-code/util-arrays';
import { findGearRatios, findPartNumbers } from './partNumberFinder';

describe('partNumberFinder', () => {
  it('should find part numbers', () => {
    const schematic = createMatrix<string>([
      ['4', '6', '7', '.', '.', '1', '1', '4', '.', '.'],
      ['.', '.', '.', '*', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '3', '5', '.', '.', '6', '3', '3', '.'],
      ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'],
      ['6', '1', '7', '*', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '+', '.', '5', '8', '.'],
      ['.', '.', '5', '9', '2', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '7', '5', '5', '.'],
      ['.', '.', '.', '$', '.', '*', '.', '.', '.', '.'],
      ['.', '6', '6', '4', '.', '5', '9', '8', '.', '.'],
    ]);
    const expectedPartNumbers = [
      '467',
      '35',
      '633',
      '617',
      '592',
      '755',
      '664',
      '598',
    ];

    expect(
      expectedPartNumbers.reduce((acc, cur) => {
        return acc + Number.parseInt(cur);
      }, 0)
    ).toEqual(4361);

    const partNumbers = findPartNumbers(schematic);
    expect(partNumbers).toEqual(expectedPartNumbers);
  });
});

describe('findGearRatios', () => {
  it('should find gear ratios', () => {
    const schematic = createMatrix<string>([
      ['4', '6', '7', '.', '.', '1', '1', '4', '.', '.'],
      ['.', '.', '.', '*', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '3', '5', '.', '.', '6', '3', '3', '.'],
      ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'],
      ['6', '1', '7', '*', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '+', '.', '5', '8', '.'],
      ['.', '.', '5', '9', '2', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '7', '5', '5', '.'],
      ['.', '.', '.', '$', '.', '*', '.', '.', '.', '.'],
      ['.', '6', '6', '4', '.', '5', '9', '8', '.', '.'],
    ]);

    const gearRatios = findGearRatios(schematic);

    expect(gearRatios).toEqual([16345, 451490]);
  });
});
