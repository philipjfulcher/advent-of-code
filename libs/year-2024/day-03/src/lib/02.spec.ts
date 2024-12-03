import { calculateAnswer } from './02';

describe('day 03, exercise 02', () => {
  it('should calculate the answer in test data', async () => {
    const results = await calculateAnswer('test-input02.txt');

    expect(results).toEqual(48);
  });

  it('should calculate the answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual(104083373);
  });
});
