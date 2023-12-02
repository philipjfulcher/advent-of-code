import { calculateAnswer } from './01';

describe('day 012, exercise 01', () => {
  xit('should calculate the answer in test data', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results).toEqual(10);

    const biggerResults = await calculateAnswer('test-input2.txt');

    expect(biggerResults).toEqual(19);

    const evenBiggerResults = await calculateAnswer('test-input3.txt');

    expect(evenBiggerResults).toEqual(226);
  });

  xit('should calculate the answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual(5178);
  });
});
