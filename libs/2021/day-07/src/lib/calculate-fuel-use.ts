export function calculateFuelUse(
  horizontalPositions: number[],
  target: number
) {
  return horizontalPositions.reduce((acc, cur) => {
    const fuelUse = cur > target ? cur - target : target - cur;
    return acc + fuelUse;
  }, 0);
}

export function calculateIncreasedFuelUse(
  horizontalPositions: number[],
  target: number
) {
  return horizontalPositions.reduce((acc, cur) => {
    const steps = cur > target ? cur - target : target - cur;

    const fuelUse = (steps * (steps + 1)) / 2;

    return acc + fuelUse;
  }, 0);
}
