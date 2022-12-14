import { calculateAnswer } from './01';

describe('day 01, exercise 01', () => {
  it('should count increasing numbers in test data', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results).toEqual(7);
  });

  it('should count increasing numbers', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual(1754);
  });
});
