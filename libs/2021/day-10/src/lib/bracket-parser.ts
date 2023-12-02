const openingBrackets = ['<', '[', '(', '{'];

const closingBrackets = ['>', ']', ')', '}'];

export function parseBrackets(str: string) {
  const openBrackets: string[] = [];

  const result = {
    brackets: str,
    complete: false,
    valid: true,
    firstInvalidBracket: null,
    autoComplete: '',
  };

  const queue = str.split('');

  while (result.valid && queue.length > 0) {
    const bracket = queue.shift();

    // console.log(`Testing ${bracket}`);

    if (isOpeningBracket(bracket)) {
      openBrackets.push(bracket);
    } else {
      const lastOpeningBracket = openBrackets[openBrackets.length - 1];
      const expectedClosingBracket = getClosingBracket(lastOpeningBracket);

      if (bracket === expectedClosingBracket) {
        openBrackets.pop();
      } else {
        // console.log(
        //   `${str} - Expected ${expectedClosingBracket}, but found ${bracket} instead.`
        // );
        result.valid = false;
        result.firstInvalidBracket = bracket;
      }
    }
  }

  if (result.valid) {
    result.complete = openBrackets.length === 0;
    if (!result.complete) {
      result.autoComplete = openBrackets.reduce((acc, cur) => {
        return `${getClosingBracket(cur)}${acc}`;
      }, '');
    }
  }

  return result;
}

function isOpeningBracket(bracket: string) {
  return openingBrackets.includes(bracket);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isClosingBracket(bracket: string) {
  return closingBrackets.includes(bracket);
}

function getClosingBracket(bracket: string) {
  const index = openingBrackets.findIndex((search) => search === bracket);
  //   console.log(
  //     `For opening bracket ${bracket}, expected closing bracket is ${closingBrackets[index]}`
  //   );
  return closingBrackets[index];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getOpeningBracket(bracket: string) {
  const index = closingBrackets.findIndex((search) => search === bracket);
  return openingBrackets[index];
}
