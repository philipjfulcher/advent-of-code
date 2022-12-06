export function simulateLanternFish(
  initialFish: number[],
  numberOfDays: number
) {
  const fishInStages: Record<number, number> = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };

  initialFish.forEach((fish) => {
    fishInStages[fish]++;
  });
  console.log({ fishInStages });

  for (let day = 1; day <= numberOfDays; day++) {
    //these days don't have anything special, just tick them down
    const fishAboutToSpawn = fishInStages[0];

    for (let normalDay = 0; normalDay < 8; normalDay++) {
      fishInStages[normalDay] = fishInStages[normalDay + 1];
    }

    if (fishAboutToSpawn > 0) {
      fishInStages[8] = fishAboutToSpawn;
      fishInStages[6] += fishAboutToSpawn;
    } else {
      fishInStages[8] = 0;
    }

    console.log({ fishInStages });
  }

  return Object.values(fishInStages).reduce((acc, cur) => (acc += cur), 0);
}
