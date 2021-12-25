import { calculateAnswer } from './02';

describe('day 012, exercise 02', () => {
  it('should calculate the answer in test data', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results).toEqual(36);

    const biggerResults = await calculateAnswer('test-input2.txt');

    expect(biggerResults).toEqual(103);

    const evenBiggerResults = await calculateAnswer('test-input3.txt');

    expect(evenBiggerResults).toEqual(3509)

  });

  it('should calculate the answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual(130094);
  });
});
