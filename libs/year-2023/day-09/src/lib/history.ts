export function findNextValue(history: number[]) {
  const histories = [history];

  while (!histories.at(-1).every((num) => num === 0)) {
    const newHistory: number[] = [];
    const lastHistory = histories.at(-1);

    for (let i = 0; i < lastHistory.length - 1; i++) {
      newHistory.push(lastHistory[i + 1] - lastHistory[i]);
    }

    histories.push(newHistory);
  }

  histories.at(-1).push(0);

  for (let i = histories.length - 1; i >= 1; i--) {
    histories
      .at(i - 1)
      .push(histories.at(i).at(-1) + histories.at(i - 1).at(-1));
  }

  return histories[0].at(-1);
}

export function findPreviousValue(history: number[]) {
  const histories = [history];

  while (!histories.at(-1).every((num) => num === 0)) {
    const newHistory: number[] = [];
    const lastHistory = histories.at(-1);

    for (let i = 0; i < lastHistory.length - 1; i++) {
      newHistory.push(lastHistory[i + 1] - lastHistory[i]);
    }

    histories.push(newHistory);
  }

  histories.at(-1).unshift(0);

  for (let i = histories.length - 1; i >= 1; i--) {
    histories
      .at(i - 1)
      .unshift(histories.at(i - 1).at(0) - histories.at(i).at(0));
  }

  return histories[0].at(0);
}
