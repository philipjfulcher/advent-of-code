import { calculateAnswer } from './01';

describe('day 014, exercise 01', () => {
  it('should calculate the answer in test data', async () => {
    let results = await calculateAnswer('test-input.txt', 1);
    expect(results.length).toEqual(7);

    results = await calculateAnswer('test-input.txt', 2);
    expect(results.length).toEqual(13);

    results = await calculateAnswer('test-input.txt', 3);
    expect(results.length).toEqual(25);

    results = await calculateAnswer('test-input.txt', 5);
    expect(results.length).toEqual(97);

    results = await calculateAnswer('test-input.txt', 10);

    expect(results.length).toEqual(3073);
    expect(results.minMax.max).toEqual('B');
    expect(results.minMax.maxCount).toEqual(1749);
    expect(results.minMax.min).toEqual('H');
    expect(results.minMax.minCount).toEqual(161);
    expect(results.answer).toEqual(1588);
  });

  it('should calculate the answer', async () => {
    const results = await calculateAnswer('input.txt', 10);

    expect(results.answer).toEqual(2027);
  });
});
