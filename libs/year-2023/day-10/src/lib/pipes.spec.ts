import {createMatrix, Matrix} from "@advent-of-code/util-arrays";
import {findFarthestPointInLoop} from "./pipes";

describe('pipes', () => {
  it('should find farthest point', () => {
    const pipes1 = createMatrix<string>(
      [
        ['.','.','.','.','.'],
        ['.','S','-','7','.'],
        ['.','|','.','|','.'],
        ['.','L','-','J','.'],
        ['.','.','.','.','.']
      ]
    );

    const pipes2 = createMatrix<string>(
      [
        ['.','.','F','7','.'],
        ['.','F','J','|','.'],
        ['S','J','.','L','7'],
        ['|','F','-','-','J'],
        ['L','J','.','.','.'],
      ]
    );

    const pipes3 = createMatrix<string>(
      [
        ['.','.','.','F','7','.'],
        ['.','.','F','J','|','.'],
        ['F','S','J','.','L','7'],
        ['L','7','F','-','-','J'],
        ['.','L','J','.','.','.'],
      ]
    )

    expect(findFarthestPointInLoop(pipes1)).toEqual(4);
    expect(findFarthestPointInLoop(pipes2)).toEqual(8);
    expect(findFarthestPointInLoop(pipes3)).toEqual(9);
  })
})
