import { calculateAnswer } from './01';

describe('day 07, exercise 01', () => {
  it('should calculate answer using test data', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results).toEqual(37);
  });

  it('should calculate answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual(343605);
  });
});
