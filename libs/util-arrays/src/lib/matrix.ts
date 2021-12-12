export interface Matrix<CellType> {
  data: CellType[][];
  size: () => { height: number; width: number };
  getCellValue: (x: number, y: number) => CellType | null;
  setCellValue: (x: number, y: number, value: CellType) => void;

  getColumns: () => CellType[][];
  getRows: () => CellType[][];
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
    getCellValue: function (this: Matrix<CellType>, row: number, col: number) {
      return this.data?.[row]?.[col] ?? null;
    },
    setCellValue: function (row: number, col: number, value: CellType) {
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
