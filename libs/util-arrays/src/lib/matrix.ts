export interface Matrix<CellType> {
  data: CellType[][];
  forEach: (
    callback: (row: number, col: number, value: CellType) => void
  ) => void;
  applyChangeToCells: (
    callback: (row: number, col: number, value: CellType) => CellType
  ) => void;
  filter: (
    filterFunc: (row: number, col: number, value: CellType) => boolean
  ) => { row: number; col: number; value: CellType }[];
  size: () => { height: number; width: number };
  getCellValue: (row: number, col: number) => CellType;
  setCellValue: (row: number, col: number, value: CellType) => void;

  getColumns: () => CellType[][];
  getRows: () => CellType[][];
  getNeighborsForCell: (
    row: number,
    col: number
  ) => { row: number; col: number; value: CellType; direction: string }[];
}

export function createMatrix<CellType>(data: CellType[][]): Matrix<CellType> {
  return {
    data,
    size: function (this: Matrix<CellType>) {
      return {
        height: this.getRows().length,
        width: this.getColumns().length,
      };
    },
    forEach: function (this: Matrix<CellType>, callback) {
      this.getRows().forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
          callback(rowIndex, colIndex, value);
        });
      });
    },
    applyChangeToCells: function (this: Matrix<CellType>, callback) {
      this.forEach((row, col, val) => {
        const newVal = callback(row, col, val);
        this.setCellValue(row, col, newVal);
      });
    },
    filter: function (this: Matrix<CellType>, filterFunc) {
      const results: { row: number; col: number; value: CellType }[] = [];

      this.forEach((row, col, value) => {
        if (filterFunc(row, col, value)) {
          results.push({ row, col, value });
        }
      });

      return results;
    },
    getNeighborsForCell(this: Matrix<CellType>, row: number, col: number) {
      const potentialNeighbors: [number, number, string][] = [
        [row, col + 1, 'e'], // right
        [row, col - 1, 'w'], // left
        [row - 1, col, 'n'], // up
        [row + 1, col, 's'], // down
        [row + 1, col - 1, 'sw'], // diag down left
        [row - 1, col + 1, 'ne'], // diag up right
        [row + 1, col + 1, 'se'], // diag down right
        [row - 1, col - 1, 'nw'], // diag up left
      ];
      // console.log(potentialNeighbors);
      const filteredNeighbors = potentialNeighbors.filter(
        ([potentialRow, potentialCol]) => {
          const size = this.size();
          return (
            potentialRow >= 0 &&
            potentialCol >= 0 &&
            potentialRow < size.height &&
            potentialCol < size.width
          );
        }
      );

      return filteredNeighbors.map(([row, col, direction]) => {
        return { row, col, value: this.getCellValue(row, col), direction };
      });
    },
    getCellValue: function (this: Matrix<CellType>, row: number, col: number) {
      return this.data[row][col];
    },
    setCellValue: function (row: number, col: number, value: CellType) {
      // console.log(`Setting row,col: ${row},${col}`)
      data[row][col] = value;
    },
    getRows: function (this: Matrix<CellType>) {
      return this.data;
    },
    getColumns: function (this: Matrix<CellType>) {
      const numRows = data.length;
      const numCols = data[0].length;

      //   console.log({numRows,numCols})

      const columns: CellType[][] = [];

      for (let col = 0; col < numCols; col++) {
        const column: CellType[] = [];
        for (let row = 0; row < numRows; row++) {
          // console.log({row, col});
          column.push(this.data[row][col]);
        }
        // console.log({col, column})
        columns.push(column);
      }

      return columns;
    },
  };
}
