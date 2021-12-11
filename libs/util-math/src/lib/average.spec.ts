import { calculateMode, calculateMedian, calculateMean } from './average';

describe('average', () => {
  it('should calculate mode', () => {
    const numbers = [1, 1, 1, 2, 2, 3];

    expect(calculateMode(numbers));
  });

  it('should calculate median', () => {
    const oddNumbers = [1, 3, 3, 6, 7, 8, 9];
    const evenNumbers = [1, 2, 3, 4, 5, 6, 8, 9];

    expect(calculateMedian(oddNumbers)).toEqual(6);
    expect(calculateMedian(evenNumbers)).toEqual(4.5);
  });

  it('should calculate mean', () => {
    const numbers = [
      2500, 2700, 2400, 2300, 2550, 2650, 2750, 2450, 2600, 2400,
    ];

    expect(calculateMean(numbers)).toEqual(2530);
  });
});
