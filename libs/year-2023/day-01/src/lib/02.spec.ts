import { calculateAnswer } from './02';

describe('day 01, exercise 02', () => {
  it('should calculate the answer in test data', async () => {
    const results = await calculateAnswer('test-input2.txt');

    expect(results).toEqual(281);
  });

  it('should calculate the answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual(52834);
  });
});
