import { createMatrix } from '@advent-of-code/util-arrays';
import { Line } from './interfaces';

export function Grid(lines: Line[], drawDiagonals = false) {
  const maxX = lines.reduce((acc, cur) => {
    if (cur.start[0] > acc) {
      return cur.start[0];
    } else if (cur.end[0] > acc) {
      return cur.end[0];
    } else {
      return acc;
    }
  }, 0);

  const maxY = lines.reduce((acc, cur) => {
    if (cur.start[1] > acc) {
      return cur.start[1];
    } else if (cur.end[1] > acc) {
      return cur.end[1];
    } else {
      return acc;
    }
  }, 0);

  this.width = maxX + 1;
  this.height = maxY + 1;

  const data: number[][] = [];

  for (let row = 0; row < this.height; row++) {
    data.push([]);

    for (let col = 0; col < this.width; col++) {
      data[row].push(0);
    }
  }
  this.matrix = createMatrix<number>(data);

  lines.forEach((line) => this.drawLine(line, drawDiagonals));
}

Grid.prototype.drawLine = function (line: Line, drawDiagonals: boolean) {
  const direction =
    line.start[0] === line.end[0]
      ? 'vertical'
      : line.start[1] === line.end[1]
      ? 'horizontal'
      : 'diagonal';

  switch (direction) {
    case 'horizontal': {
      // console.log(`${line.start} => ${line.end}`);
      if (line.start[0] < line.end[0]) {
        for (let i = line.start[0]; i <= line.end[0]; i++) {
          // console.log(`drawing ${i}, ${line.start[1]}`);

          const currentValue = this.matrix.getCellValue(i, line.start[1]);
          this.matrix.setCellValue(i, line.start[1], currentValue + 1);
        }
      } else {
        for (let i = line.start[0]; i >= line.end[0]; i--) {
          // console.log(`drawing ${i}, ${line.start[1]}`);
          const currentValue = this.matrix.getCellValue(i, line.start[1]);
          this.matrix.setCellValue(i, line.start[1], currentValue + 1);
        }
      }

      break;
    }
    case 'vertical': {
      // console.log(`${line.start} => ${line.end}`);
      if (line.start[1] < line.end[1]) {
        for (let i = line.start[1]; i <= line.end[1]; i++) {
          // console.log(`drawing ${line.start[0]}, ${i}`);

          const currentValue = this.matrix.getCellValue(line.start[0], i);
          this.matrix.setCellValue(line.start[0], i, currentValue + 1);
        }
      } else {
        for (let i = line.start[1]; i >= line.end[1]; i--) {
          // console.log(`drawing ${line.start[0]}, ${i}`);

          const currentValue = this.matrix.getCellValue(line.start[0], i);
          this.matrix.setCellValue(line.start[0], i, currentValue + 1);
        }
      }
      break;
    }

    case 'diagonal': {
      if (drawDiagonals) {
        // console.log(`${line.start} => ${line.end}`);
        if (line.start[0] < line.end[0] && line.start[1] < line.end[1]) {
          let y = line.start[1];

          for (let x = line.start[0]; x <= line.end[0]; x++) {
            // console.log(`drawing ${x}, ${y}`);

            const currentValue = this.matrix.getCellValue(x, y);
            this.matrix.setCellValue(x, y, currentValue + 1);

            y++;
          }
        } else if (line.start[0] > line.end[0] && line.start[1] > line.end[1]) {
          let y = line.start[1];

          for (let x = line.start[0]; x >= line.end[0]; x--) {
            // console.log(`drawing ${x}, ${y}`);

            const currentValue = this.matrix.getCellValue(x, y);
            this.matrix.setCellValue(x, y, currentValue + 1);

            y--;
          }
        } else if (line.start[0] < line.end[0] && line.start[1] > line.end[1]) {
          let y = line.start[1];

          for (let x = line.start[0]; x <= line.end[0]; x++) {
            // console.log(`drawing ${x}, ${y}`);

            const currentValue = this.matrix.getCellValue(x, y);
            this.matrix.setCellValue(x, y, currentValue + 1);

            y--;
          }
        } else if (line.start[0] > line.end[0] && line.start[1] < line.end[1]) {
          let y = line.start[1];

          for (let x = line.start[0]; x >= line.end[0]; x--) {
            // console.log(`drawing ${x}, ${y}`);

            const currentValue = this.matrix.getCellValue(x, y);
            this.matrix.setCellValue(x, y, currentValue + 1);

            y++;
          }
        }

        // console.log(this.visualize());
      }

      break;
    }
  }

  // console.log(this.visualize());
};

Grid.prototype.visualize = function () {
  return this.matrix.getRows().reduce((acc, cur) => {
    if (acc !== '') {
      acc += '\r\n';
    }

    cur.forEach((cell) => {
      if (cell === 0) {
        acc += '.';
      } else {
        acc += `${cell}`;
      }
    });

    return acc;
  }, '');
};
