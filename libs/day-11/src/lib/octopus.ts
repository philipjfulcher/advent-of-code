import { createMatrix, Matrix } from '@advent-of-code/util-arrays';

function visualizeMatrix(
  matrix: Matrix<{ energy: number; hasFlashed: boolean }>
) {
  let output = '';
  matrix.getRows().forEach((row) => {
    output += row.map((cell) => cell.energy);
    output += '\r\n';
  });
  console.log(output);
}
export function calculateOctopusEnergy(
  startingEnergy: number[][],
  steps: number
) {
  const matrix = createMatrix<{ energy: number; hasFlashed: boolean }>(
    startingEnergy.map((row) =>
      row.map((cell) => ({ energy: cell, hasFlashed: false }))
    )
  );

  console.log('Before any steps');
  visualizeMatrix(matrix);

  let flashCount = 0;

  for (let step = 1; step <= steps; step++) {
    // increase every cell by 1
    matrix.applyChangeToCells((row, col, val) => {
      return { hasFlashed: false, energy: val.energy + 1 };
    });

    const flashQueue = matrix.filter((row, col, value) => {
      return value.energy > 9;
    });

    while (flashQueue.length > 0) {
      const cell = flashQueue.shift();
      const currentCellValue = matrix.getCellValue(cell.row, cell.col);

      if (!currentCellValue.hasFlashed) {
        console.log(
          `Cell row: ${cell.row}, col: ${cell.col}, value: ${cell.value.energy} is flashing`
        );

        matrix.setCellValue(cell.row, cell.col, {
          ...currentCellValue,
          hasFlashed: true,
        });

        const neighbors = matrix.getNeighborsForCell(cell.row, cell.col);

        neighbors.forEach(({ row, col, value }) => {
          const newEnergy = value.energy + 1;

          matrix.setCellValue(row, col, {
            ...value,
            energy: newEnergy,
          });

          if (newEnergy > 9 && !value.hasFlashed) {
            flashQueue.push({
              row,
              col,
              value: {
                ...value,
                energy: newEnergy,
              },
            });
          }
        });
      }
    }

    // set cells that have flashed to 0
    matrix.applyChangeToCells((row, col, value) => {
      if (value.hasFlashed) {
        flashCount++;
        return {
          hasFlashed: false,
          energy: 0,
        };
      } else {
        return {
          ...value,
          hasFlashed: false,
        };
      }
    });

    console.log(`After step ${step}`);
    visualizeMatrix(matrix);
  }

  return flashCount;
}

export function calculateFirstSync(startingEnergy: number[][]) {
  const matrix = createMatrix<{ energy: number; hasFlashed: boolean }>(
    startingEnergy.map((row) =>
      row.map((cell) => ({ energy: cell, hasFlashed: false }))
    )
  );

  let firstSyncStep = -1;
  let currentStep = 1;

  while (firstSyncStep === -1) {
    // increase every cell by 1
    matrix.applyChangeToCells((row, col, val) => {
      return { hasFlashed: false, energy: val.energy + 1 };
    });

    const flashQueue = matrix.filter((row, col, value) => {
      return value.energy > 9;
    });

    while (flashQueue.length > 0) {
      const cell = flashQueue.shift();
      const currentCellValue = matrix.getCellValue(cell.row, cell.col);

      if (!currentCellValue.hasFlashed) {
        console.log(
          `Cell row: ${cell.row}, col: ${cell.col}, value: ${cell.value.energy} is flashing`
        );

        matrix.setCellValue(cell.row, cell.col, {
          ...currentCellValue,
          hasFlashed: true,
        });

        const neighbors = matrix.getNeighborsForCell(cell.row, cell.col);

        neighbors.forEach(({ row, col, value }) => {
          const newEnergy = value.energy + 1;

          matrix.setCellValue(row, col, {
            ...value,
            energy: newEnergy,
          });

          if (newEnergy > 9 && !value.hasFlashed) {
            flashQueue.push({
              row,
              col,
              value: {
                ...value,
                energy: newEnergy,
              },
            });
          }
        });
      }
    }

    // set cells that have flashed to 0
    matrix.applyChangeToCells((row, col, value) => {
      if (value.hasFlashed) {
        return {
          hasFlashed: false,
          energy: 0,
        };
      } else {
        return {
          ...value,
          hasFlashed: false,
        };
      }
    });

    // check if all cells are 0

    if (
      matrix.data
        .flat()
        .map((cell) => cell.energy)
        .every((energy) => energy === 0)
    ) {
      firstSyncStep = currentStep;
    }

    currentStep++;
  }

  return firstSyncStep;
}
