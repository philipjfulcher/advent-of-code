import { calculateAnswer } from './02';

describe('day 08, exercise 02', () => {
  it('should calculate the answer in test data', async () => {
    const results = await calculateAnswer('ghost-input.txt');

    expect(results).toEqual(6);
  });

  it('should calculate the answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual(21003205388413);
  });
});
