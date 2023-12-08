export function parseAlmanacLines(lines: string[]): [number, number, number][] {
  const map: [number, number, number][] = [];

  lines.forEach((line) => {
    map.push(
      line.split(' ').map((entry) => Number.parseInt(entry, 10)) as [
        number,
        number,
        number
      ]
    );
  });

  return map;
}

export function getValueForKey(map: [number, number, number][], key: number) {
  let value = key;
  const entry = map.find(([, source, range]) => {
    return value >= source && value <= source + range - 1;
  });

  if (entry) {
    const [dest, source] = entry;
    value = dest + (value - source);
  }

  return value;
}

export function getKeyForValue(map: [number, number, number][], value: number) {
  let key = value;
  const entry = map.find(([dest, source, range]) => {
    return key >= dest && key <= dest + range - 1;
  });

  if (entry) {
    const [dest, source] = entry;
    key = source + (value - dest);
  }

  return key;
}

export function getBucketForKey(map: [number, number, number][], key: number) {
  return map.findIndex(([, source, range]) => {
    return key >= source && key <= source + range - 1;
  });
}
export function followMaps(
  maps: [number, number, number][][],
  source: number
): number {
  let currentValue = source;

  maps.forEach((currentMap) => {
    currentValue = getValueForKey(currentMap, currentValue);
  });

  return currentValue;
}

export function reverseFollowMaps(
  maps: [number, number, number][][],
  value: number
) {
  let currentValue = value;

  maps.forEach((currentMap) => {
    currentValue = getKeyForValue(currentMap, currentValue);
  });

  return currentValue;
}
