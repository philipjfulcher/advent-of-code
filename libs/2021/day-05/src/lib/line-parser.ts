import { Line } from './interfaces';

export function parseLine(str: string): Line {
  const splitLine = str.split(' -> ');

  const start = splitLine[0].split(',').map((coord) => parseInt(coord, 10));
  const end = splitLine[1].split(',').map((coord) => parseInt(coord, 10));

  return {
    start: [start[0], start[1]],
    end: [end[0], end[1]],
  };
}
