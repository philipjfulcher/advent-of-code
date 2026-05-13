import { calculateAnswer, turnDialAndCountRefactor } from './02';

describe('day 01, exercise 02', () => {
  it('should calculate the answer in test data', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results).toEqual(6);
  });

  it('should calculate the answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual(5847);
  });
});

describe('turnAndCount', () => {
  it('should calculate the right number of times zero is passed', () => {
    expect(turnDialAndCountRefactor(50, 'R', 1000)[1]).toEqual(10);
    expect(turnDialAndCountRefactor(0, 'R', 110)[1]).toEqual(1);
    expect(turnDialAndCountRefactor(99, 'R', 110)[1]).toEqual(2);
    expect(turnDialAndCountRefactor(99, 'R', 1)[1]).toEqual(1);
    expect(turnDialAndCountRefactor(85, 'R', 14)[1]).toEqual(0);
    expect(turnDialAndCountRefactor(50, 'R', 670)[1]).toEqual(7);
  });
});
