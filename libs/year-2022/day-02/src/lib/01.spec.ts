import { calculateAnswer } from './01';

describe('day 02, exercise 01', () => {
  it('should calculate the answer in test data', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results).toEqual(15);
  });

  it('should calculate the answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).not.toEqual(14360);
    expect(results).toEqual(10941);
  });
});
