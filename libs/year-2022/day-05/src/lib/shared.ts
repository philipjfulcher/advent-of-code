export function parseStackLines(lines: string[]): string[][] {
  const colNums = lines.pop().replaceAll(' ', '').split('');

  const rows: string[][] = lines.map((line) =>
    line
      .replaceAll('[', '')
      .replaceAll('] ', '|')
      .replaceAll(']', '')
      .replaceAll('    ', '|')
      .split('|')
      .filter((cell) => cell !== '   ')
  );
  return colNums.map((col) => {
    const index = Number.parseInt(col, 10) - 1;
    return rows
      .map((row) => row[index] ?? null)
      .filter((cell) => cell !== null && cell !== '');
  });
}

export interface MoveInstruction {
  num: number;
  from: number;
  to: number;
}
export function parseMoveLines(lines: string[]): MoveInstruction[] {
  return lines.map((line) => {
    const matches = line.match(/move (\d+) from (\d+) to (\d+)/);
    return {
      num: Number.parseInt(matches[1], 10),
      from: Number.parseInt(matches[2], 10),
      to: Number.parseInt(matches[3], 10),
    };
  });
}

export function performMoves(
  stacks: string[][],
  moves: MoveInstruction[],
  multiMove = false
): string[][] {
  moves.forEach((move) => {
    const boxes: string[] = [];

    for (let i = move.num; i > 0; i--) {
      if (multiMove) {
        boxes.unshift(stacks[move.from - 1].shift());
      } else {
        boxes.push(stacks[move.from - 1].shift());
      }
    }

    boxes.forEach((box) => {
      stacks[move.to - 1].unshift(box);
    });
  });

  return stacks;
}

export function getTopOfEachStack(stacks: string[][]): string[] {
  return stacks.map((stack) => stack[0]);
}
