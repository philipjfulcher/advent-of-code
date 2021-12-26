import { createMatrix, Matrix } from '@advent-of-code-2021-nx/util-arrays';

export class Sheet {
  private matrix: Matrix<boolean>;

  constructor(data: boolean[][]) {
    this.matrix = createMatrix<boolean>(data);
  }

  mark(x: number, y: number) {
    // console.log(`Marking ${x},${y}`);
    this.matrix.setCellValue(y, x, true);
  }

  countMarks(): number {
    let count = 0;
    this.matrix.forEach((row, col, val) => {
      if (val) {
        count++;
      }
    });

    return count;
  }

  visualize() {
    let output = '';
    this.matrix.getRows().forEach((row) => {
      row.forEach((cell) => (output += cell ? '#' : '.'));
      output += '\r\n';
    });

    console.log(output);
  }

  fold(direction: 'x' | 'y', val: number) {
    const { width, height } = this.matrix.size();

    if (direction === 'y') {
      const newHeight = height - val - 1;
      const newMatrix = createMatrix<boolean>(
        this.createData(newHeight, width)
      );

      const rows = this.matrix.getRows();

      for (let forwardRow = 0; forwardRow < newHeight; forwardRow++) {
        const rowToMark = rows[forwardRow];
        rowToMark.forEach((cell, col) => {
          if (cell) {
            newMatrix.setCellValue(forwardRow, col, cell);
          }
        });
      }

      for (let mirrorRow = height - 1; mirrorRow > newHeight; mirrorRow--) {
        const rowToMark = rows[mirrorRow];
        rowToMark.forEach((cell, col) => {
          if (cell) {
            // console.log(`mirrow row ${mirrorRow} to ${height - 1 - mirrorRow}`);
            newMatrix.setCellValue(height - 1 - mirrorRow, col, cell);
          }
        });
      }

      this.matrix = newMatrix;
    } else if (direction === 'x') {
      const newWidth = width - val - 1;
      const newMatrix = createMatrix<boolean>(
        this.createData(height, newWidth)
      );
// console.log({width, height,newWidth});
      const cols = this.matrix.getColumns();

      for (let forwardCol = 0; forwardCol < newWidth; forwardCol++) {
        const colToMark = cols[forwardCol];
        colToMark.forEach((cell, row) => {
          if (cell) {
            newMatrix.setCellValue(row, forwardCol, cell);
          }
        });
      }

      for (let mirrorCol = width - 1; mirrorCol > newWidth; mirrorCol--) {
        const colToMark = cols[mirrorCol];
        colToMark.forEach((cell, row) => {
          if (cell) {
            newMatrix.setCellValue(row, width - 1 - mirrorCol, cell);
          }
        });
      }

      this.matrix = newMatrix;
    }

    // console.log(`row lengths: ${this.matrix.getRows().map(row => row.length)}`)
    // console.log(`cols lengths: ${this.matrix.getColumns().map(col => col.length)}`)
  }

  private createData(numRows: number, numCols: number): boolean[][] {
    const data: boolean[][] = [];

    for (let row = 0; row < numRows; row++) {
      data.push([]);
      for (let col = 0; col < numCols; col++) {
        data[row].push(false);
      }
    }

    return data;
  }
}
