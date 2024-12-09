import { calculateAnswer } from './01';

describe.skip('day 06, exercise 01', () => {
  it('should calculate the answer in test data', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results).toEqual(41);
  });

  it('should calculate the answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual(5329);
  });
});
