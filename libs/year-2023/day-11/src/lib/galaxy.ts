import { createMatrix, Matrix } from '@advent-of-code/util-arrays';

type Galaxy = Matrix<string>;

export function expandGalaxy(galaxy: Galaxy): Galaxy {
  const rowsToExpand = galaxy
    .getRows()
    .map((row, index) => (row.every((cell) => cell === '.') ? index : null))
    .filter((row) => row !== null);
  const colsToExpand = galaxy
    .getColumns()
    .map((col, index) => (col.every((cell) => cell === '.') ? index : null))
    .filter((col) => col !== null);

  const expandedData = [];
  galaxy.getRows().forEach((row, rowIndex) => {
    const newRow = [];

    row.forEach((cell, colIndex) => {
      newRow.push(cell);

      if (colsToExpand.includes(colIndex)) {
        newRow.push(cell);
      }
    });

    expandedData.push(newRow);

    if (rowsToExpand.includes(rowIndex)) {
      expandedData.push(newRow);
    }
  });

  return createMatrix<string>(expandedData);
}

export function findGalaxies(
  galaxy: Galaxy
): { row: number; col: number; value: string }[] {
  return galaxy.filter((row, col, value) => value === '#');
}

export function findShortestPathLengthBetweenGalaxies(
  galaxies: { row: number; col: number; value: string }[]
): { from: number; to: number; length: number }[] {
  const lengths: { from: number; to: number; length: number }[] = [];

  galaxies.forEach((fromGalaxy, fromIndex) => {
    galaxies.forEach((toGalaxy, toIndex) => {
      if (toIndex > fromIndex) {
        lengths.push({
          from: fromIndex,
          to: toIndex,
          length: findLength(fromGalaxy, toGalaxy),
        });
      }
    });
  });

  return lengths;
}

export function findLength(
  from: { row: number; col: number },
  to: { row: number; col: number }
) {
  const rowLength = from.col > to.col ? from.col - to.col : to.col - from.col;
  const colLength = from.row > to.row ? from.row - to.row : to.row - from.row;
  // console.log({rowLength,colLength})
  return rowLength + colLength;
}
