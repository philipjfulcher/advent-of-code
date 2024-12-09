import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import {createMatrix, Matrix} from "@advent-of-code/util-arrays";

function solveMap(mapData: string[][]): Matrix<string> {
  const now = Date.now();
  const map = createMatrix<string>([...mapData]);
  let currentCell = map.filter((row, col, value) => value === '^')[0];

  const rotationOrder: ('n' | 's' | 'e' | 'w')[] = ['n', 'e', 's', 'w']
  let currentDirection = 0;


  while (currentCell !== null) {
    const neighbors = map.getNeighborsForCell(currentCell.row, currentCell.col);
    const nextCell = neighbors.find(neighbor => neighbor.direction === rotationOrder[currentDirection % 4]);

    if (nextCell === undefined) {
      map.setCellValue(currentCell.row, currentCell.col, 'X');
      currentCell = null;
    } else if (nextCell?.value !== '#') {
      map.setCellValue(nextCell.row, nextCell.col, '^');
      map.setCellValue(currentCell.row, currentCell.col, 'X');
      currentCell = nextCell;
    } else {
      currentDirection++;
    }
  }

  console.log(`Took ${Date.now()-now}ms to solve`);


  return map;
}

function solveMapV2(mapData: string[][]): {map: Matrix<string>,hasLoop: boolean,visitedCells: Set<string>} {
  const map = createMatrix(mapData);
  let hasLoop = false;
  let currentCell = map.filter((row,col,value) => value === '^')[0];
  const rotationOrder: ('n' | 's' | 'e' | 'w')[] = ['n', 'e', 's', 'w']
  let currentDirection = 0;

  const obstacles = map.filter((row,col,value) => value === '#');
  const rowObstacles = obstacles.reduce<Record<number,number[]>>((acc,cur) => {
    if(acc[cur.row]) {
      acc[cur.row].push(cur.col);
    } else {
      acc[cur.row] = [cur.col];
    }

    return acc;
  },{});

  const colObstacles = obstacles.reduce<Record<number,number[]>>((acc,cur) => {
    if(acc[cur.col]) {
      acc[cur.col].push(cur.row);
    } else {
      acc[cur.col] = [cur.row];
    }

    return acc;
  },{});

  const visitedCells = new Set<string>();
// console.log(rowObstacles);
// console.log(colObstacles);
const now = Date.now();
  while(currentCell !== null) {
    // console.log({currentCell,visitedCells:visitedCells.size});
    const direction = rotationOrder[currentDirection % 4];
    if(direction === 'n') {
      const nextObstable = colObstacles[currentCell.col]?.filter(colObstacle => colObstacle < currentCell.row);
      // console.log({nextObstable});
      const nextRow = nextObstable?.at(-1);
      // console.log(nextRow);
      if(nextRow !== undefined) {
        visitedCells.add(createCellId(currentCell,direction))
        currentCell = {row:nextRow +1, col: currentCell.col, value: map.getCellValue(nextRow +1,currentCell.col)};
        currentDirection++;
      } else {
        // console.log(`escaped from ${currentCell}`)
        currentCell = null;
      }
    } else if(direction === 's') {
      const nextRow = colObstacles[currentCell.col]?.filter(colObstacle => colObstacle > currentCell.row).at(0);
      if(nextRow !== undefined) {
        visitedCells.add(createCellId(currentCell,direction))
        currentCell = {row:nextRow -1, col: currentCell.col, value: map.getCellValue(nextRow -1,currentCell.col)};
        currentDirection++;
      } else {
        // console.log(`escaped from ${currentCell}`)
        currentCell = null;
      }
    } else if(direction === 'e') {
      const nextObstacle = rowObstacles[currentCell.row]?.filter(rowObstacle => rowObstacle > currentCell.col);
      // console.log('e',{nextObstacle});
      const nextCol = nextObstacle?.at(0);
      // console.log('e', {nextCol})
      if(nextCol !== undefined) {
        visitedCells.add(createCellId(currentCell,direction))
        currentCell = {row:currentCell.row, col: nextCol-1, value: map.getCellValue(currentCell.row,nextCol-1)};
        currentDirection++;
      } else {
        // console.log(`escaped from ${currentCell}`)
        currentCell = null;
      }
    }else if(direction === 'w') {
      const nextCol = rowObstacles[currentCell.row]?.filter(rowObstacle => rowObstacle < currentCell.col).at(-1);
      if(nextCol !== undefined) {
        visitedCells.add(createCellId(currentCell,direction))
        currentCell = {row:currentCell.row, col: nextCol+1, value: map.getCellValue(currentCell.row,nextCol+1)};
        currentDirection++;
      } else {
        // console.log(`escaped from ${currentCell}`)
        currentCell = null;
      }
    }

    if(currentCell) {
      // console.log({visitedCells});
      // console.log(`checking for ${createCellId(currentCell,rotationOrder[currentDirection % 4])}`)
    }

    if(currentCell && visitedCells.has(createCellId(currentCell,rotationOrder[currentDirection % 4]))) {
      // console.log(`it has a loop`)
      hasLoop = true;
      currentCell = null;
    }
  }

  for(const visit of visitedCells) {
        const [row,col,direction] = visit.split('-');
        const rowNum = parseInt(row,10);
        const colNum = parseInt(col,10);
        map.setCellValue(rowNum,colNum,'+');
  }


  return {map,hasLoop,visitedCells};

}

function createCellId({row,col}: {row: number,col:number}, direction: string) {
  return `${row}-${col}-${direction}` ;
}

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const mapData: string[][] = [];

    rl.on('line', (line) => {
      mapData.push(line.split(''));
    });

    rl.on('close', () => {
      const now = Date.now();
      // const solvedMap = solveMap(JSON.parse(JSON.stringify(mapData)));
      // console.log(`v1 solved in ${Date.now() - now}`);
      // now = Date.now();

      const solvedMap = solveMap(JSON.parse(JSON.stringify(mapData)));
      console.log(`v1 solved in ${Date.now() - now}`);

      // const visits = solvedMap.filter((row,col,value) => value === 'X');
      let possibleLoops = 0;

      // console.log(`Map is solved`)

      // for(const visit of solvedMapV2.visitedCells) {
      //     console.log({visit});
      //     const [row,col,direction] = visit.split('-');
      //     const rowNum = parseInt(row,10);
      //     const colNum = parseInt(col,10);
      //
      //   const newMapData = JSON.parse(JSON.stringify(mapData));
      //   // console.log({visit});
      //   // console.log(newMapData[visit.row][visit.col]);
      //   // const visit = {row: 0, col: 0,value: '.'};
      //   // const index = 0;
      //   if(newMapData[rowNum][colNum] !== '^') {
      //     newMapData[rowNum][colNum] = '#';
      //     console.log(`Solving map variation ${visit}`)
      //     console.log({rowNum,colNum});
      //     const newMap = solveMapV2(newMapData);
      //     if(newMap.hasLoop) {
      //       possibleLoops++;
      //     }
      //   }
      // }
      solvedMap.filter((row,col,value) => value === 'X').forEach((visit,index) => {
        const newMapData = JSON.parse(JSON.stringify(mapData));
        console.log({visit});
        // console.log(newMapData[visit.row][visit.col]);
      // const visit = {row: 0, col: 0,value: '.'};
      // const index = 0;
        if(newMapData[visit.row][visit.col] !== '^') {
          newMapData[visit.row][visit.col] = '#';
          // console.log(newMapData)
          console.log(`Solving map variation ${index}`)
          const now = Date.now();
          const newMap = solveMapV2(newMapData);
          console.log(`Solved in ${Date.now() - now}`);
          // newMap.map.data.forEach(row => {
          //     console.log(row.join(''));
          // });
          // console.log(newMap.visitedCells);

          if(newMap.hasLoop) {
            possibleLoops++;
          }
        }
      })

      console.log(`The answer is ${possibleLoops}`);

      resolve(possibleLoops);
    });
  });

  return promise;
}
