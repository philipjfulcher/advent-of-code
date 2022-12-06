import { calculateAnswer } from './02';

describe('day 05, exercise 02', () => {
  it('should calculate the answer in test data', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results).toEqual('MCD');
  });

  it('should calculate the answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual('GMPMLWNMG');
  });
});
