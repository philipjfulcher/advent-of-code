export type HandShape = 'rock' | 'paper' | 'scissors';
export type GameState = 'win' | 'lose' | 'tie';

export const decrypt:  Record<string,HandShape> = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'rock',
  Y: 'paper',
  Z: 'scissors'
};

export const decryptExercise2 : Record<string,GameState> = {
  X: 'lose',
  Y: 'tie',
  Z: 'win'
}
export const scores: Record<HandShape | GameState,number> = {
  rock: 1,
  paper: 2,
  scissors: 3,
  lose: 0,
  tie: 3,
  win: 6
}


export function calculateGameScore(handshape: HandShape, gameState: GameState) {
  return scores[handshape] + scores[gameState];
}

export function playGame(player: HandShape, opponent: HandShape): GameState {
  if(player === opponent) {
    return 'tie';
  }

  if((player === 'rock' && opponent === 'paper') || (player === 'paper' && opponent === 'scissors') || ((player === 'scissors' && opponent === 'rock'))) {
    return 'lose';
  } else {
    return 'win'
  }
}

export function getDesiredGamestate(opponent: HandShape, desiredGamestate: GameState): HandShape {
  switch(desiredGamestate) {
    case 'win':
      return findWinningHandShape(opponent);
    case 'lose':
      return findLosingHandShape(opponent);
    case 'tie':
      return opponent;
  }
}

export function findWinningHandShape(handshape: HandShape): HandShape {
  switch(handshape) {
    case 'scissors':
      return 'rock';
    case 'rock':
      return 'paper';
    case 'paper':
      return "scissors";
  }
}

export function findLosingHandShape(handshape: HandShape): HandShape {
  switch(handshape) {
    case 'scissors':
      return 'paper';
    case 'paper':
      return 'rock';
    case 'rock':
      return 'scissors'; 
  }
}
