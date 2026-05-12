import {calculateAnswer, solveEquation} from './01';

describe('day 07, exercise 01', () => {
  it('should calculate the answer in test data', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results).toEqual(3749);
  });

  it('should calculate the answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual(0);
  });
});

describe('solveEquation', () => {
  it('should calculate equation in order', () => {
    expect(solveEquation([10, '*', 19])).toEqual(190);
    expect(solveEquation([81, '+', 40, '*', 27])).toEqual(3267);
    expect(solveEquation([81, '*', 40, '+', 27])).toEqual(3267);
    expect(solveEquation([11, '+', 6, '*', 16, '+', 20])).toEqual(292);
  })
})
