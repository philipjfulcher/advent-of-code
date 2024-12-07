import { calculateAnswer } from './01';

describe('day 04, exercise 01', () => {
  it('should calculate the answer in test data', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results).toEqual(18);
  });

  it('should calculate the answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual(2390);
  });
});
