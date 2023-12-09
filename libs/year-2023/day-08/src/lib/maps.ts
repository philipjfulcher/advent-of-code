import { lcm } from 'mathjs';

export function followDirections(
  map: Map<string, [string, string]>,
  directions: string
): number {
  let currentLocation = 'AAA';
  let numSteps = 0;
  while (currentLocation !== 'ZZZ') {
    for (let i = 0; i < directions.length; i++) {
      currentLocation =
        directions[i] === 'L'
          ? map.get(currentLocation)[0]
          : map.get(currentLocation)[1];
      numSteps++;
      if (currentLocation === 'ZZZ') {
        break;
      }
    }
  }

  return numSteps;
}

export function followGhostDirections(
  map: Map<string, [string, string]>,
  directions: string
): number {
  const startingLocations = findStartingLocations([...map.keys()]);
  const startingLocationLoops = new Map<string, number[]>();

  startingLocations.forEach((startingLocation) => {
    const ends = [];
    let currentLocation = startingLocation;
    let currentDirections = directions;

    let foundLoop = false;

    while (!foundLoop) {
      const end = findEnd(map, currentDirections, currentLocation);
      if (currentLocation === end[0]) {
        foundLoop = true;
      }
      currentLocation = end[0] as string;
      const numSteps = end[1];
      const remainingDirections = directions.slice(numSteps as number);

      currentDirections = remainingDirections.concat(
        directions.slice(0, numSteps as number)
      );

      ends.push(end);
    }

    startingLocationLoops.set(
      startingLocation,
      ends.map((end) => end[1])
    );
  });

  return findLcf([...startingLocationLoops.values()].map((val) => val[0]));
}

function findStartingLocations(locations: string[]) {
  return locations.filter((location) => location.endsWith('A'));
}

function findEnd(
  map: Map<string, [string, string]>,
  directions: string,
  startingLocation: string
) {
  let currentLocation = startingLocation;
  let numSteps = 0;
  let directionsFollowed = '';

  do {
    for (let i = 0; i < directions.length; i++) {
      currentLocation =
        directions[i] === 'L'
          ? map.get(currentLocation)[0]
          : map.get(currentLocation)[1];
      numSteps++;
      directionsFollowed += directions[i];
      if (currentLocation.endsWith('Z')) {
        break;
      }
    }
  } while (!currentLocation.endsWith('Z'));

  return [currentLocation, numSteps, directionsFollowed];
}

export function findLcf(nums: number[]) {
  // @ts-expect-error mathjs types aren't very good
  return lcm(...nums);
}
