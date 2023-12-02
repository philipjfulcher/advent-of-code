import { parseMonkeyInput, runWorryFunction } from './shared';

describe('parseMonkeyInput', () => {

  it('should parse monkey input', () => {
    const monkeyLines = [
      'Monkey 0:',
'  Starting items: 79, 98',
'  Operation: new = old * 19',
'  Test: divisible by 23',
'    If true: throw to monkey 2',
'    If false: throw to monkey 3',
    ];

    expect(parseMonkeyInput(monkeyLines)).toEqual({
      id: 0,
      items: [79, 98],
      itemsInspected: 0,
      testValue: 23,
      truthyDest: 2,
      falsyDest: 3,
      worryFunction: "old * 19"
    });

    expect(runWorryFunction(1,parseMonkeyInput(monkeyLines).worryFunction)).toEqual(19);
    expect(runWorryFunction(10,parseMonkeyInput(monkeyLines).worryFunction)).toEqual(190);

  })
}

)
