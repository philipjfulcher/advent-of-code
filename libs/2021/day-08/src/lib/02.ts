import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';

interface DisplaySegmentConfig {
  top: boolean;
  topLeft: boolean;
  topRight: boolean;
  middle: boolean;
  bottomLeft: boolean;
  bottomRight: boolean;
  bottom: boolean;
}

interface DisplaySegmentPossibleConfig {
  top: Set<string>;
  topLeft: Set<string>;
  topRight: Set<string>;
  middle: Set<string>;
  bottomLeft: Set<string>;
  bottomRight: Set<string>;
  bottom: Set<string>;
}

type DigitSegmentMap = Record<string, DisplaySegmentConfig>;

const digitSegments: DigitSegmentMap = {
  '0': {
    top: true,
    topLeft: true,
    topRight: true,
    middle: false,
    bottomLeft: true,
    bottomRight: true,
    bottom: true,
  },
  '1': {
    top: false,
    topLeft: false,
    topRight: true,
    middle: false,
    bottomLeft: false,
    bottomRight: true,
    bottom: false,
  },
  '2': {
    top: true,
    topLeft: false,
    topRight: true,
    middle: true,
    bottomLeft: true,
    bottomRight: false,
    bottom: true,
  },
  '3': {
    top: true,
    topLeft: false,
    topRight: true,
    middle: true,
    bottomLeft: false,
    bottomRight: true,
    bottom: true,
  },
  '4': {
    top: false,
    topLeft: true,
    topRight: true,
    middle: true,
    bottomLeft: false,
    bottomRight: true,
    bottom: false,
  },
  '5': {
    top: true,
    topLeft: true,
    topRight: false,
    middle: true,
    bottomLeft: false,
    bottomRight: true,
    bottom: true,
  },
  '6': {
    top: true,
    topLeft: true,
    topRight: false,
    middle: true,
    bottomLeft: true,
    bottomRight: true,
    bottom: true,
  },
  '7': {
    top: true,
    topLeft: false,
    topRight: true,
    middle: false,
    bottomLeft: false,
    bottomRight: true,
    bottom: false,
  },
  '8': {
    top: true,
    topLeft: true,
    topRight: true,
    middle: true,
    bottomLeft: true,
    bottomRight: true,
    bottom: true,
  },
  '9': {
    top: true,
    topLeft: true,
    topRight: true,
    middle: true,
    bottomLeft: false,
    bottomRight: true,
    bottom: false,
  },
};

function visualizeSegments(segments: DigitSegmentMap) {
  for (const digit in segments) {
    console.log(digit);

    const outputLines: string[] = ['', '', ''];

    if (segments[digit].topLeft) {
      outputLines[0] += '|';
    } else {
      outputLines[0] += ' ';
    }

    if (segments[digit].top) {
      outputLines[0] += '-';
    } else {
      outputLines[0] += ' ';
    }

    if (segments[digit].topRight) {
      outputLines[0] += '|';
    } else {
      outputLines[0] += ' ';
    }

    if (segments[digit].middle) {
      outputLines[1] += ' - ';
    } else {
      outputLines[1] += '   ';
    }

    if (segments[digit].bottomLeft) {
      outputLines[2] += '|';
    } else {
      outputLines[2] += ' ';
    }

    if (segments[digit].bottom) {
      outputLines[2] += '_';
    } else {
      outputLines[2] += ' ';
    }

    if (segments[digit].bottomRight) {
      outputLines[2] += '|';
    } else {
      outputLines[2] += ' ';
    }

    console.log(outputLines.join('\r\n'));
  }
}

export async function calculateAnswer(fileName: string) {
  // visualizeSegments(digitSegments);
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const lines: string[] = [];

    rl.on('line', (line) => {
      lines.push(line);
    });

    rl.on('close', () => {
      const entries: { uniqueSignals: string; display: string }[] = [];

      lines.forEach((line) => {
        const split = line.split('|');

        entries.push({ uniqueSignals: split[0], display: split[1] });
      });

      const numOfDisplaySegments: Record<string, number> = {
        '0': 6,
        '1': 2,
        '2': 5,
        '3': 5,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 3,
        '8': 7,
        '9': 6,
      };

      const reverseLookup: Record<string, Array<string>> = {};

      for (const displayNumber in numOfDisplaySegments) {
        if (reverseLookup[numOfDisplaySegments[displayNumber]]) {
          reverseLookup[numOfDisplaySegments[displayNumber]].push(
            displayNumber
          );
        } else {
          reverseLookup[numOfDisplaySegments[displayNumber]] = [displayNumber];
        }
      }

      console.log({ reverseLookup });

      const digitsWithUniqueNumbers = ['1', '4', '7'];

      const sum = 0;

      entries.forEach((entry) => {
        const uniqueSignals = entry.uniqueSignals.split(' ');
        const digits = entry.display.split(' ');

        const possibleMappings: DisplaySegmentPossibleConfig = {
          topLeft: new Set<string>(),
          top: new Set<string>(),
          topRight: new Set<string>(),
          middle: new Set<string>(),
          bottomLeft: new Set<string>(),
          bottomRight: new Set<string>(),
          bottom: new Set<string>(),
        };

        // figure out unique combinations first
        uniqueSignals.forEach((signal) => {
          const digitByLength = reverseLookup[signal.length];
          if (digitByLength !== undefined && digitByLength.length === 1) {
            const digit = digitByLength[0];

            if (digit !== '8') {
              console.log({ length: signal.length, digitByLength, digit });
              const litSegments = (
                Object.keys(digitSegments[digit]) as Array<
                  keyof DigitSegmentMap
                >
              ).filter((segmentName) => digitSegments[digit][segmentName]);

              litSegments.forEach((litSegmentName) => {
                signal.split('').forEach((char) => {
                  // console.log({ litSegmentName, char });
                  possibleMappings[litSegmentName].add(char);
                });
              });
              console.log({ digit, litSegments });
            }
          }
        });

        // find digits with overlap
        const overlappingSegments: Record<string, string[]> = {};

        digitsWithUniqueNumbers.forEach((digit) => {
          console.log({ digit });
          for (const segment in digitSegments[digit]) {
            if (overlappingSegments[segment] === undefined) {
              overlappingSegments[segment] = [];
            }

            if (digitSegments[digit][segment]) {
              overlappingSegments[segment].push(digit);
            }
          }
        });

        console.log({ overlappingSegments });

        console.log(possibleMappings);
      });

      console.log(`The sum of all output values is ${sum}`);

      resolve(sum);
    });
  });

  return promise;
}
