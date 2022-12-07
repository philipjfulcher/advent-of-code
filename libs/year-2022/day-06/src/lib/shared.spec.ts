import { findStartOfPacketMarker } from './shared';

it('should find start of packet header', () => {
  expect(findStartOfPacketMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toEqual(7);
  expect(findStartOfPacketMarker('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(5);
  expect(findStartOfPacketMarker('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(6);
  expect(findStartOfPacketMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toEqual(
    10
  );
  expect(findStartOfPacketMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toEqual(
    11
  );
});

it('should find start of message header', () => {
  expect(findStartOfPacketMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)).toEqual(
    19
  );
  expect(findStartOfPacketMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)).toEqual(
    23
  );
  expect(findStartOfPacketMarker('nppdvjthqldpwncqszvftbrmjlhg', 14)).toEqual(
    23
  );
  expect(
    findStartOfPacketMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14)
  ).toEqual(29);
  expect(
    findStartOfPacketMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14)
  ).toEqual(26);
});
