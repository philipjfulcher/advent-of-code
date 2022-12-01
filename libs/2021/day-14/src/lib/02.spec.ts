import { calculateAnswer } from './01';

describe('day 014, exercise 02', () => {
  it('should calculate the answer in test data', async () => {
    const results = await calculateAnswer('test-input.txt', 40);

    expect(results.answer).toEqual(2188189693529);
    expect(results.minMax.max).toEqual('B');
    expect(results.minMax.maxCount).toEqual(2192039569602);
    expect(results.minMax.min).toEqual('H');
    expect(results.minMax.minCount).toEqual(3849876073);
  });

  it('should calculate the answer', async () => {
    const results = await calculateAnswer('input.txt', 40);

    expect(results.answer).toEqual(2265039461737);
  });
});
