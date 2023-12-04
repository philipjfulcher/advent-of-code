import { Matrix } from '@advent-of-code/util-arrays';
import { stringIsNumber } from '@advent-of-code/util-math';

export function findPartNumbers(schematic: Matrix<string>): string[] {
  const concatRows: string[] = schematic.getRows().map((row) => row.join(''));
  const regexp = /[0-9]+/g;

  const partNumbers = new Array<string>();

  concatRows.forEach((row, rowIndex) => {
    const matches = row.matchAll(regexp);
    for (const match of matches) {
      let valid = false;
      for (
        let i = match.index;
        i < match.index + match.toString().length;
        i++
      ) {
        if (valid === false) {
          const neighbors = schematic.getNeighborsForCell(rowIndex, i);
          const symbolNeighbors = neighbors.filter(
            ({ value }) => !stringIsNumber(value) && value !== '.'
          );

          if (symbolNeighbors.length > 0) {
            valid = true;
          }
        }
      }

      if (valid) {
        partNumbers.push(match.toString());
      }
    }
  });

  return partNumbers;
}

export function findGearRatios(schematic: Matrix<string>) {
  const gears = schematic.filter((row, col, val) => val === '*');

  const gearRatios: number[] = [];

  const concatRows: string[] = schematic.getRows().map((row) => row.join(''));
  const regexp = /[0-9]+/g;

  gears.forEach((gear) => {
    const numberNeighbors = schematic
      .getNeighborsForCell(gear.row, gear.col)
      .filter((cell) => stringIsNumber(cell.value));
    if (numberNeighbors.length > 1) {
      let partNumbers: string[] = [];

      numberNeighbors.forEach((neighbor) => {
        const currentRow = concatRows[neighbor.row];

        if (currentRow) {
          const matches = currentRow.matchAll(regexp);
          for (const match of matches) {
            if (
              neighbor.col >= match.index &&
              neighbor.col < match.index + match.toString().length
            ) {
              partNumbers.push(match.toString());
            }
          }
        }
      });

      if (partNumbers.every((partNumber) => partNumber === partNumbers[0])) {
        //every number is the same, this is not a gear
        return;
      }

      if (partNumbers.length > 2) {
        //we found more than two part numbers, de-dupe
        partNumbers = [...new Set(partNumbers)];
      }

      if (partNumbers.length === 2) {
        gearRatios.push(
          Number.parseInt(partNumbers[0]) * Number.parseInt(partNumbers[1])
        );
      }
    }
  });

  return gearRatios;
}
