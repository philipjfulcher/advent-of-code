import { calculateAnswer } from './01';

describe('day 08, exercise 01', () => {
  xit('should calculate answer with test input', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results).toEqual(26);
  });

  xit('should calculate answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual(349);
  });
});
