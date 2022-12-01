import { calculateAnswer } from './01';

describe('day 011, exercise 01', () => {
  it('should calculate the answer in test data', async () => {
    const results = await calculateAnswer('test-input.txt', 10);

    expect(results).toEqual(204);

    const biggerResults = await calculateAnswer('test-input.txt', 100);

    expect(biggerResults).toEqual(1656);
  });

  it('should calculate the answer', async () => {
    const results = await calculateAnswer('input.txt', 100);

    expect(results).toEqual(1755);
  });
});
