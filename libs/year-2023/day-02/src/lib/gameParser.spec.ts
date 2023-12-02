import {
  Bag,
  isGamePossible,
  minimumBagForGame,
  parseGame,
} from './gameParser';

describe('gameParser', () => {
  it('should parse game id', () => {
    const game1 = parseGame(
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
    );

    expect(game1.id).toEqual('1');

    const game2 = parseGame(
      'Game 21: 20 red, 4 green, 5 blue; 10 red, 11 green, 4 blue; 1 red, 8 blue, 14 green; 11 green, 8 blue, 15 red; 8 blue, 2 green, 13 red'
    );

    expect(game2.id).toEqual('21');
  });

  it('should parse number of pulls', () => {
    const game1 = parseGame(
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
    );

    expect(game1.pulls.length).toEqual(3);

    const game2 = parseGame(
      'Game 21: 20 red, 4 green, 5 blue; 10 red, 11 green, 4 blue; 1 red, 8 blue, 14 green; 11 green, 8 blue, 15 red; 8 blue, 2 green, 13 red'
    );

    expect(game2.pulls.length).toEqual(5);
  });

  it('should parse pull colors', () => {
    const game1 = parseGame(
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
    );

    expect(game1.pulls[0]).toEqual([
      { quantity: 3, color: 'blue' },
      { quantity: 4, color: 'red' },
    ]);
    expect(game1.pulls[1]).toEqual([
      { quantity: 1, color: 'red' },
      { quantity: 2, color: 'green' },
      { quantity: 6, color: 'blue' },
    ]);
    expect(game1.pulls[2]).toEqual([{ quantity: 2, color: 'green' }]);
  });
});

describe('isGamePossible', () => {
  it('should find possible games', () => {
    const bag: Bag = {
      red: 12,
      green: 13,
      blue: 14,
    };

    const game1 = parseGame(
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
    );
    const game3 = parseGame(
      'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red'
    );
    const game5 = parseGame(
      'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
    );

    expect(isGamePossible(bag, game1)).toBe(true);
    expect(isGamePossible(bag, game3)).toBe(false);
    expect(isGamePossible(bag, game5)).toBe(true);
  });
});

describe('minimumBagForGame', () => {
  it('should find minimum bag for game', () => {
    const game1 = parseGame(
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
    );
    const bag1: Bag = { red: 4, green: 2, blue: 6 };

    const minBag1 = minimumBagForGame(game1);

    expect(minBag1).toEqual(bag1);
    expect(isGamePossible(minBag1, game1));
  });
});
