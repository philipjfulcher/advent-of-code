import {
  getTopOfEachStack,
  MoveInstruction,
  parseMoveLines,
  parseStackLines,
  performMoves,
} from './shared';

it('should parse stack lines', () => {
  const input: string[] = ['[D]', '[N] [C]', '[Z] [M] [P]', ' 1   2   3 '];
  expect(parseStackLines(input)).toEqual([['D', 'N', 'Z'], ['C', 'M'], ['P']]);
});

it('should parse instruction lines', () => {
  const input: string[] = ['move 1 from 2 to 3', 'move 3 from 1 to 3'];

  expect(parseMoveLines(input)).toEqual([
    { num: 1, from: 2, to: 3 },
    { num: 3, from: 1, to: 3 },
  ]);
});

it('should perform moves', () => {
  const stacks: string[][] = [['a', 'b', 'c'], []];
  const moves: MoveInstruction[] = [{ from: 1, to: 2, num: 3 }];
  expect(performMoves(stacks, moves)).toEqual([[], ['c', 'b', 'a']]);
});

it('should get top boxes', () => {
  const stacks: string[][] = [['a'], ['b', 'c'], ['d'], ['e', 'f', 'g']];
  expect(getTopOfEachStack(stacks)).toEqual(['a', 'b', 'd', 'e']);
});
