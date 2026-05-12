import { calculateAnswer, turnDial } from './01';

describe('day 01, exercise 01', () => {
  it('should calculate the answer in test data', async () => {
    const results = await calculateAnswer('test-input.txt');

    expect(results).toEqual(3);
  });

  it('should calculate the answer', async () => {
    const results = await calculateAnswer('input.txt');

    expect(results).toEqual(995);
  });
});

describe('turnDial', () => {
  it('should return the correct end', () => {
    /* 
The dial starts by pointing at 50.
The dial is rotated L68 to point at 82.
The dial is rotated L30 to point at 52.
The dial is rotated R48 to point at 0.
The dial is rotated L5 to point at 95.
The dial is rotated R60 to point at 55.
The dial is rotated L55 to point at 0.
The dial is rotated L1 to point at 99.
The dial is rotated L99 to point at 0.
The dial is rotated R14 to point at 14.
The dial is rotated L82 to point at 32.
    */
    expect(turnDial(50, 'L', 68)).toEqual(82);
    expect(turnDial(82, 'L', 30)).toEqual(52);
    expect(turnDial(52, 'R', 48)).toEqual(0);
    expect(turnDial(0, 'L', 5)).toEqual(95);
    expect(turnDial(95, 'R', 60)).toEqual(55);
    expect(turnDial(55, 'L', 55)).toEqual(0);
    expect(turnDial(0, 'L', 1)).toEqual(99);
    expect(turnDial(99, 'L', 99)).toEqual(0);
    expect(turnDial(0, 'R', 14)).toEqual(14);
    expect(turnDial(14, 'L', 82)).toEqual(32);
  });
});
