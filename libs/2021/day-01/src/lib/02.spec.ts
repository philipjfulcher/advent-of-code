import { calculateAnswer } from './02';

describe('day 01, exercise 02', () => {
  it('should calculate answer in test data', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results).toEqual(5);
  });

  it('should calculate answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual(1789);
  });
});
