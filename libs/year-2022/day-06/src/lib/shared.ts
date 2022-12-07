export function findStartOfPacketMarker(input: string, markerLength = 4) {
  let endOfMarkerIndex = markerLength - 1;
  for (let index = 0; index < input.length; index++) {
    endOfMarkerIndex++;

    const testString = input.slice(index, endOfMarkerIndex);
    if (testString.length === new Set(testString).size) break;
  }

  return endOfMarkerIndex;
}
