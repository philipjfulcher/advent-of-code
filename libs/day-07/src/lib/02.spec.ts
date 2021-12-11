import { calculateAnswer } from './02';

describe('day 07, exercise 02', () => {
  it('should calculate answer using test data', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results).toEqual(168);
  });

  it('should calculate answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual(96744904);
  });
});
