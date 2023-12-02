import { createMatrix } from '@advent-of-code/util-arrays';

export class HeightMap {
  matrix = createMatrix<number>(this.rows);

  constructor(private rows: number[][]) {}

  getNeighborsForCell(row: number, col: number) {
    const potentialNeighbors = [
      [row, col + 1], // right
      [row, col - 1], // left
      [row - 1, col], // up
      [row + 1, col], // down
      //   [row + 1, col - 1], // diag down left
      //   [row - 1, col + 1], // diag up right
      //   [row + 1, col + 1], // diag down right
      //   [row - 1, col - 1], // diag up left
    ];
    // console.log(potentialNeighbors);
    const filteredNeighbors = potentialNeighbors.filter(
      ([potentialRow, potentialCol]) => {
        const size = this.matrix.size();
        return (
          potentialRow >= 0 &&
          potentialCol >= 0 &&
          potentialRow < size.height &&
          potentialCol < size.width
        );
      }
    );

    return filteredNeighbors.map(([row, col]) => {
      return { row, col };
    });
  }

  findLowPoints() {
    const size = this.matrix.size();
    // console.log(size);
    const lowPointCoords = [];

    for (let row = 0; row < size.height; row++) {
      for (let col = 0; col < size.width; col++) {
        const cell = this.matrix.getCellValue(row, col);
        const neighbors = this.getNeighborsForCell(row, col);
        if (
          neighbors.every(
            ({ row, col }) => this.matrix.getCellValue(row, col) > cell
          )
        ) {
          //   console.log(`low point: ${row},${col} = ${cell}`);
          lowPointCoords.push({ row, col });
        }
      }
    }

    return lowPointCoords;
  }

  calculateRiskScore() {
    return this.findLowPoints()
      .map(
        (lowPoint) => this.matrix.getCellValue(lowPoint.row, lowPoint.col) + 1
      )
      .reduce((acc, cur) => acc + cur, 0);
  }

  calculateBasins() {
    const lowPoints = this.findLowPoints();

    const basins: Array<Array<{ row: number; col: number }>> = [];

    lowPoints.forEach((lowPoint) => {
      basins.push(this.searchForBasin(lowPoint, basins.flat()));
    });

    basins.sort((a, b) => b.length - a.length);

    const top3Basins = basins.slice(0, 3);

    top3Basins.forEach((basin, index) => {
      console.log(`basin #${index}, size ${basin.length}`);
    });
    const score = top3Basins.reduce((acc, cur) => acc * cur.length, 1);

    return score;
  }

  searchForBasin(
    lowPoint: { row: number; col: number },
    alreadyInBasin: Array<{ row: number; col: number }>
  ): Array<{ row: number; col: number }> {
    // console.log(
    //   `Searching for basin for row: ${lowPoint.row}, col: ${lowPoint.col}`
    // );
    const basin: Map<string, { row: number; col: number }> = new Map();

    basin.set(`${lowPoint.row}-${lowPoint.col}`, lowPoint);

    const getFilteredNeighbors = (lowPointToSearch, alreadyInBasinToSearch) => {
      return this.getNeighborsForCell(
        lowPointToSearch.row,
        lowPointToSearch.col
      ).filter(
        (neighbor) =>
          !alreadyInBasinToSearch.find(
            (inBasin) =>
              inBasin.row === neighbor.row && inBasin.col === neighbor.col
          ) && this.matrix.getCellValue(neighbor.row, neighbor.col) !== 9
      );
    };

    const neighbors = getFilteredNeighbors(lowPoint, alreadyInBasin);
    const toCheck = [
      {
        precedingCell: lowPoint,
        precedingValue: this.matrix.getCellValue(lowPoint.row, lowPoint.col),
        neighbors,
      },
    ];

    // console.log(
    //   `First neighbors to check: [${neighbors.map(
    //     (neighbor) => `row: ${neighbor.row}, col: ${neighbor.col} | `
    //   )}]`
    // );

    while (toCheck.length > 0) {
      const cellUnderTest = toCheck.pop();

      cellUnderTest.neighbors.forEach((cell) => {
        const value = this.matrix.getCellValue(cell.row, cell.col);
        // console.log(
        //   `Testing cell: ${cell.row}, col: ${cell.col}, value: ${value}`
        // );

        // console.log(
        //   `Comparing cell value ${value} to preceding value ${cellUnderTest.precedingValue}`
        // );
        if (value > cellUnderTest.precedingValue && value < 9) {
          //   console.log('adding to basin');
          basin.set(`${cell.row}-${cell.col}`, cell);
          toCheck.push({
            precedingCell: cell,
            precedingValue: value,
            neighbors: getFilteredNeighbors(cell, [
              ...alreadyInBasin,
              ...basin,
            ]),
          });
        }
      });
    }
    // console.log(`basin size is ${basin.size}`);
    return [...basin].map((mapEntry) => mapEntry[1]);
  }
}
