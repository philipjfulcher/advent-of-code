export interface Game {
  id: string;
  pulls: Array<Bricks[]>;
}

export interface Bricks {
  quantity: number;
  color: BrickColor;
}

export type BrickColor = 'red' | 'blue' | 'green';

export type Bag = Record<BrickColor, number>;

const brickColors: BrickColor[] = ['red', 'blue', 'green'];

export function parseGame(game: string): Game {
  const gameSplit = game.split(': ');
  const gameId = gameSplit[0].match(/[0-9]+/)[0];

  const pulls = gameSplit[1].split('; ').map((pull) => {
    return pull.split(', ').map<Bricks>((bricks) => {
      return {
        quantity: Number.parseInt(bricks.match(/[0-9]+/)[0], 10),
        color: bricks.match(/red|blue|green/)[0] as BrickColor,
      };
    });
  });

  return {
    id: gameId,
    pulls,
  };
}

function isBrickColor(color: string): color is BrickColor {
  return color.match(/red|blue|green/).length > 0;
}

export function isGamePossible(bag: Bag, game: Game) {
  let possible = true;

  game.pulls.forEach((pull) => {
    pull.forEach((bricks) => {
      if (bricks.quantity > bag[bricks.color]) {
        possible = false;
      }
    });
  });

  return possible;
}

export function minimumBagForGame(game: Game): Bag {
  const bag: Bag = {
    red: 0,
    blue: 0,
    green: 0,
  };

  game.pulls.forEach((pull) => {
    pull.forEach((bricks) => {
      if (bricks.quantity > bag[bricks.color]) {
        bag[bricks.color] = bricks.quantity;
      }
    });
  });

  return bag;
}
