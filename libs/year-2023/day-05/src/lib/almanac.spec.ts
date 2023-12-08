import {followMaps, getValueForKey, parseAlmanacLines, reverseFollowMaps} from "./almanac";

describe('parseAlmanacLines', () => {
  it('should parse lines', () => {
    const lines =
      ["50 98 2",
        "52 50 48",];

    const map = parseAlmanacLines(lines);
    expect([...map.values()].length).toEqual(2);
    expect(getValueForKey(map, 98)).toEqual(50);
    expect(getValueForKey(map, 99)).toEqual(51);
    expect(getValueForKey(map, 53)).toEqual(55);
    expect(getValueForKey(map, 50)).toEqual(52);
    expect(getValueForKey(map, 49)).toEqual(49);
    expect(getValueForKey(map, 100)).toEqual(100);
  })
});

describe('followMaps', () => {
  it('should follow maps', () => {
    const maps = [
      parseAlmanacLines([
        "50 98 2",
        "52 50 48"]),

      parseAlmanacLines([
        "0 15 37",
        "37 52 2",
        "39 0 15"]),

      parseAlmanacLines([
        "49 53 8",
        "0 11 42",
        "42 0 7",
        "57 7 4"]),

      parseAlmanacLines([
        "88 18 7",
        "18 25 70"]),

      parseAlmanacLines([
        "45 77 23",
        "81 45 19",
        "68 64 13"]),

      parseAlmanacLines([
        "0 69 1",
        "1 0 69"]),

      parseAlmanacLines([
        "60 56 37",
        "56 93 4"])
    ];

    expect(followMaps(maps, 79)).toEqual(82);
    expect(followMaps(maps, 14)).toEqual(43);
    expect(followMaps(maps, 55)).toEqual(86);
    expect(followMaps(maps, 13)).toEqual(35);

    // Seed 79, soil 81, fertilizer 81, water 81, light 74, temperature 78, humidity 78, location 82.
    // Seed 14, soil 14, fertilizer 53, water 49, light 42, temperature 42, humidity 43, location 43.
    // Seed 55, soil 57, fertilizer 57, water 53, light 46, temperature 82, humidity 82, location 86.
    // Seed 13, soil 13, fertilizer 52, water 41, light 34, temperature 34, humidity 35, location 35.
  })
})

describe('reverseFollowMaps', () => {
  it('should reverse follow maps', () => {
    const maps = [
      parseAlmanacLines([
        "50 98 2",
        "52 50 48"]),

      parseAlmanacLines([
        "0 15 37",
        "37 52 2",
        "39 0 15"]),

      parseAlmanacLines([
        "49 53 8",
        "0 11 42",
        "42 0 7",
        "57 7 4"]),

      parseAlmanacLines([
        "88 18 7",
        "18 25 70"]),

      parseAlmanacLines([
        "45 77 23",
        "81 45 19",
        "68 64 13"]),

      parseAlmanacLines([
        "0 69 1",
        "1 0 69"]),

      parseAlmanacLines([
        "60 56 37",
        "56 93 4"])
    ];

    maps.reverse();

    expect(reverseFollowMaps([maps[0]], 82)).toEqual(78);

    expect(reverseFollowMaps(maps, 82)).toEqual(79);
    expect(reverseFollowMaps(maps, 43)).toEqual(14);
    expect(reverseFollowMaps(maps, 86)).toEqual(55);
    expect(reverseFollowMaps(maps, 35)).toEqual(13);

  })
})
