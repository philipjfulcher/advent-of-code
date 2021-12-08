import { calculateAnswer } from './02';

describe('day 05, exercise 02', () => {
  it('should calculate answer with test data', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results.cellsWithCrossingLines).toEqual(12);
    expect(results.visualization).toEqual(
      `1.1....11.\r\n.111...2..\r\n..2.1.111.\r\n...1.2.2..\r\n.112313211\r\n...1.2....\r\n..1...1...\r\n.1.....1..\r\n1.......1.\r\n222111....`
    );
  });

  it('should calculate answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results.cellsWithCrossingLines).toEqual(17882);
  });
});
