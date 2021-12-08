import { calculateAnswer } from './01';

describe('day 05, exercise 01', () => {
  it('should calculate answer with test data', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results.cellsWithCrossingLines).toEqual(5);
    expect(results.visualization).toEqual(
      `.......1..\r\n..1....1..\r\n..1....1..\r\n.......1..\r\n.112111211\r\n..........\r\n..........\r\n..........\r\n..........\r\n222111....`
    );
  });

  it('should calculate answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results.cellsWithCrossingLines).toEqual(5084);
  });
});
