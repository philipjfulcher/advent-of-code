import {createInterface} from 'readline';
import {createReadStream} from 'fs';
import {join} from 'path';

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const equations: number[][] = [];

    rl.on('line', (line) => {
      const [result, operands] = line.split(': ');
      const separateOperands = operands.split(' ').map(operand => parseInt(operand, 10));
      equations.push([parseInt(result, 10)].concat(separateOperands));
    });

    rl.on('close', () => {
      let answer = 0;
      equations.forEach(equation => {
        const [result, ...operands] = equation;
        const possibleSolutions: EquationParts[] = [];

        for(let possibleCounter =0; possibleCounter < Math.pow(2, operands.length - 1); possibleCounter++) {
          possibleSolutions.push([])
        }
        // console.log({operands});
        operands.forEach((operand, oIndex) => {
          // console.log({operand})
          // console.log({pre: possibleSolutions})

          for (let i = 0; i < possibleSolutions.length; i++) {
            possibleSolutions[i].push(operand);
            if(operand !== operands.at(-1)) {
              // console.log(i, (i+1) % 2)
              if(oIndex % 2 === 0) {
                possibleSolutions[i].push('*');

              } else {
                possibleSolutions[i].push('+');

              }
            }
            //
            // console.log(i, possibleSolutions[i])
            // operands.forEach( (operand) => {
            //
            //
            // });
          }
          // console.log({post: possibleSolutions})

          if(possibleSolutions.some(possibleSolution => solveEquation(possibleSolution) === result)) {
            console.log(`${result} has a valid answer`)
            answer += result;
          }

        })


        console.log({possibleSolutions})


      })


      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}

type EquationParts = Array<number | '*' | '+'>;

export function solveEquation(parts: EquationParts) {
  let total = 0;
  let currentOperator: '*' | '+';
  let previousNumber: number;
  parts.forEach(part => {
    if (part === '*' || part === '+') {
      currentOperator = part;
    } else {
      if (previousNumber && currentOperator) {
        if (currentOperator === "+") {
          total = previousNumber + part;
        } else {
          total = previousNumber * part;
        }

        previousNumber = total;
        currentOperator = undefined;

      } else {
        previousNumber = part;
      }
    }
  });

  return total;
}
