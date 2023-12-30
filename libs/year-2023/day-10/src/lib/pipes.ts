import { Matrix } from '@advent-of-code/util-arrays';

const pipeDirections = {
  '|': ['n', 's'],
  '-': ['e', 'w'],
  L: ['n', 'e'],
  J: ['n', 'w'],
  '7': ['s', 'w'],
  F: ['s', 'e'],
};

const reversePipeDirections = {
  '|': ['s', 'n'],
  '-': ['w', 'e'],
  L: ['s', 'w'],
  J: ['s', 'e'],
  '7': ['n', 'e'],
  F: ['n', 'w'],
};

const pipeFromDirections = {
  ns: '|',
  ew: '-',
  en: 'L',
  nw: 'J',
  sw: '7',
  es: 'F',
};

const reverseDirections = {
  n: 's',
  s: 'n',
  e: 'w',
  w: 'e',
};

export function findFarthestPointInLoop(pipes: Matrix<string>) {
  const loops = findLoop(pipes);

  return Math.ceil(Math.max(...loops.map((path) => path.length - 2)) / 2);
}

export function findEnclosedTiles(pipes: Matrix<string>) {
  const counts = {
    inner: 0,
    outer: 0,
    loop: 0,
  };

  const loop = findLoop(pipes)[0];

  const loopHashMap = new Map<string, { row: number; col: number }>();

  loop.forEach((cell) => {
    loopHashMap.set(hashTile(cell), cell);
  });

  let currentArea: 'inner' | 'outer' | 'loop' = 'outer';
  let currentRow = 0;
  let isInside = false;
  let currentInsideCount = 0;

  pipes.forEach((row, col, value) => {
    // let newArea: 'inner' | 'outer' |'loop' = currentArea;
    if (row !== currentRow) {
      console.log(`new row ${row}`);
      currentRow = row;
      currentArea = 'outer';
      counts.outer += currentInsideCount;
      currentInsideCount = 0;
      isInside = false;
    }

    const onLoop = loopHashMap.has(hashTile({ row, col }));

    if (currentArea === 'loop' && onLoop) {
      counts.loop++;
      if (value === '|') {
        //we've crossed an actual barrier
        isInside = !isInside;
        console.log(`crossing barrier, isInside ${isInside}`);

        if (!isInside) {
          currentInsideCount = 0;
        }
      }
    } else if (currentArea !== 'loop' && onLoop) {
      counts.loop++;
      currentArea = 'loop';

      if (value === '|') {
        //we've crossed an actual barrier
        isInside = !isInside;
        console.log(`crossing barrier, isInside ${isInside}`);

        if (!isInside) {
          currentInsideCount = 0;
        }
      }

      if (currentInsideCount > 0) {
        console.log(`Adding ${currentInsideCount} to inside count`);
        counts.inner += currentInsideCount;
        currentInsideCount = 0;
      }
    } else {
      if (currentArea === 'loop') {
        currentArea = isInside ? 'outer' : 'inner';
        isInside = !isInside;
      }

      if (isInside && currentArea === 'inner') {
        console.log(`Cell ${row},${col} might be inner`);
        currentInsideCount++;
      } else {
        counts[currentArea]++;
      }
    }
  });

  return counts.inner;
}

// export function findEnclosedTiles(pipes: Matrix<string>) {
//   const loop = findLoop(pipes)[0];
//   console.log(loop)
//   const loopHashMap = new Map<string, { row: number, col: number }>();
//
//   loop.forEach(cell => {
//     loopHashMap.set(hashTile(cell), cell);
//   })
//
//   const visitedCells = new Set<string>();
//   const queue = [{row: 0, col: 0}];
//   const outerArea = new Set<string>();
//   outerArea.add(hashTile({row: 0, col: 0}));
// console.log(loopHashMap)
//   while (queue.length > 0) {
//     const {row, col} = queue.pop();
//
//     visitedCells.add(hashTile({row, col}));
//     const neighbors = pipes.getNeighborsForCell(row, col).filter(neighbor => ['n', 's', 'e', 'w'].includes(neighbor.direction));
//
//     neighbors.forEach(neighbor => {
//       if (!loopHashMap.has(hashTile(neighbor)) && !visitedCells.has(hashTile(neighbor))) {
//         queue.push(neighbor);
//         outerArea.add(hashTile(neighbor))
//       }
//     })
//
//   }
//   console.log([...outerArea].sort( (a,b) => a.localeCompare(b)));
//   const {height, width} = pipes.size();
//   console.log({height,width})
//   return (height * width) - loop.length - outerArea.size;
// }

function hashTile(cell: { row: number; col: number }) {
  return `${cell.row}-${cell.col}`;
}

export function findLoop(pipes: Matrix<string>) {
  const startingPoint = pipes.filter((row, col, pipe) => pipe === 'S')[0];

  const startingPaths = pipes
    .getNeighborsForCell(startingPoint.row, startingPoint.col)
    .filter(({ value, direction }, index) => {
      return reversePipeDirections[value]?.includes(direction);
    });

  const paths = new Map();
  const sortedDirections = startingPaths
    .map((path) => path.direction)
    .sort((a, b) => a.localeCompare(b))
    .join('');
  const startingPointPipe = pipeFromDirections[sortedDirections];
  // console.log({sortedDirections, startingPointPipe});
  const newValue = `S${startingPointPipe}`;
  pipes.setCellValue(startingPoint.row, startingPoint.col, newValue);

  paths.set(
    hashPath([{ ...startingPoint, value: newValue }, startingPaths[0]]),
    [
      {
        ...startingPoint,
        value: newValue,
      },
      startingPaths[0],
    ]
  );
  const completedPaths = [];

  while (paths.size > 0) {
    paths.forEach((path, key) => {
      if (path.at(-1).value.startsWith('S')) {
        // console.log(`${key} is complete`);
        completedPaths.push(path);
        // paths.delete(key)
      } else {
        // console.log(key);

        const connections = pipes
          .getNeighborsForCell(path.at(-1).row, path.at(-1).col)
          .filter(({ row, col, value, direction }, index) => {
            if (value.startsWith('S')) {
              return (
                pipeDirections[path.at(-1).value].includes(direction) &&
                reversePipeDirections[value[1]]?.includes(direction) &&
                (row !== path.at(-2).row || col !== path.at(-2).col)
              );
            } else {
              return (
                pipeDirections[path.at(-1).value].includes(direction) &&
                reversePipeDirections[value]?.includes(direction) &&
                (row !== path.at(-2).row || col !== path.at(-2).col)
              );
            }
          });

        if (connections.length === 1) {
          const newPath = [...path, connections[0]];
          paths.set(hashPath(newPath), newPath);
        } else if (connections.length > 1) {
          connections.forEach((connection) => {
            const newPath = [...path, connection];
            paths.set(hashPath(newPath), newPath);
          });
        }
      }

      paths.delete(key);
    });
  }

  return completedPaths;
}

export function hashPath(path: { value: string }[]) {
  return path.map((path) => path.value).join();
}
