import { calculateAnswer } from './01';

describe('day 06, exercise 01', () => {
  it('should calculate the answer in test data', async () => {
    const results = await calculateAnswer('test-input.txt', 18);

    expect(results).toEqual(26);

    const biggerResults = await calculateAnswer('test-input.txt', 80);
    expect(biggerResults).toEqual(5934);

    const evenBiggerResults = await calculateAnswer('test-input.txt', 256);
    expect(evenBiggerResults).toEqual(26984457539);
  });

  it('should calculate the answer', async () => {
    const results = await calculateAnswer('input.txt', 80);

    expect(results).toEqual(373378);

    const biggerResults = await calculateAnswer('input.txt', 256);

    expect(biggerResults).toEqual(1682576647495);
  });
});
