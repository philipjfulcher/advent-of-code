import { calculateAnswer } from './02';

xdescribe('day 08, exercise 02', () => {
  it('should calculate answer with test input', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results).toEqual(26);
  });

  xit('should calculate answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual(349);
  });
});
