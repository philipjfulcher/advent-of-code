import { getNumberOfPossibleWins } from './raceTimer';

describe('getPossibleWins', () => {
  it('should get possible wins', () => {
    expect(getNumberOfPossibleWins({ time: 7, distance: 9 })).toEqual(4);
    expect(getNumberOfPossibleWins({ time: 15, distance: 40 })).toEqual(8);
    expect(getNumberOfPossibleWins({ time: 30, distance: 200 })).toEqual(9);

    expect(getNumberOfPossibleWins({ time: 71530, distance: 940200 })).toEqual(
      71503
    );
  });
});
