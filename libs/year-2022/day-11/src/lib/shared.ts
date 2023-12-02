export interface Monkey{
  id: number;
  itemsInspected: number;
  items: number[];
  testValue: number;
  worryFunction: string;
  truthyDest: number;
  falsyDest: number;
}

const monkeyIdRegEx = /Monkey (\d):\|/;
const startingItemsRegex = /Starting items: ([0-9, ]*)\|/;
const worryFunctionRegex =   /Operation: (.*?)\|/;
const testFunction = /Test: divisible by (\d*)\|/;
const truthyDestRegex = /If true: throw to monkey (\d*)\|/;
const falsyDest = /If false: throw to monkey (\d*)/;

export function parseMonkeyInput(lines: string[]) {
  let id, itemsInspected, items, worryFunction;
  const joined = lines.join('|');
  return {
    id: Number.parseInt(joined.match(monkeyIdRegEx)[1], 10),
    itemsInspected: 0,
    items: joined.match(startingItemsRegex)[1].split(', ').map(str => Number.parseInt(str, 10)),
    truthyDest: Number.parseInt(joined.match(truthyDestRegex)[1], 10),
    falsyDest: Number.parseInt(joined.match(falsyDest)[1], 10),
    testValue: Number.parseInt(joined.match(testFunction)[1], 10),
    worryFunction: joined.match(worryFunctionRegex)[1].replace("new = " ,"")
  }
}

export function runWorryFunction(input: number, worryFunction: string) {
  return ((old) => {
    return eval(worryFunction);
  })(input);
}

export function runRoundOfMonkeys(monkeys: Record<number, Monkey>, worryReduceFunction: (num: number) => number) {
  const totalItems = Object.values(monkeys).reduce( (acc,cur) => acc += cur.items.length, 0);

  for(let monkeyId in monkeys) {
 //   console.log(`Checking monkey ${monkeyId}`);
    const monkey = monkeys[monkeyId];


    const newItems = monkey.items.map(item => {
     return worryReduceFunction(runWorryFunction(item,monkey.worryFunction));
    });

    
    newItems.forEach(item => {
      monkey.itemsInspected++;
      if(item % monkey.testValue === 0) {
        monkeys[monkey.truthyDest].items.push(item);
      } else {
        monkeys[monkey.falsyDest].items.push(item)
      }
    })

    monkey.items = [];

//    Object.values(monkeys).forEach(monkey => console.log(monkey.id, monkey.items));
  }

  const newTotalItems = Object.values(monkeys).reduce( (acc,cur) => acc += cur.items.length, 0);
  return monkeys;
}

export function calculateMonkeyBusiness(monkeys: Record<number, Monkey>) {
console.log(Object.values(monkeys).map(monkey => monkey.itemsInspected));
  const sortedMonkeys = Object.values(monkeys).map(monkey => monkey.itemsInspected).sort( (a,b) => b-a);
console.log(sortedMonkeys);
  return sortedMonkeys[0] * sortedMonkeys[1];
}
