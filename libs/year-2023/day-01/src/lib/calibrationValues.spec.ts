import { findCalibrationValue } from './calibrationValues';

describe('findCalibrationValue', () => {
  it('should find the right calibration value', () => {
    expect(findCalibrationValue('1abc2', false)).toEqual(12);
    expect(findCalibrationValue('pqr3stu8vwx', false)).toEqual(38);
    expect(findCalibrationValue('a1b2c3d4e5f', false)).toEqual(15);
    expect(findCalibrationValue('treb7uchet', false)).toEqual(77);

    expect(findCalibrationValue('two1nine', true)).toEqual(29);
    expect(findCalibrationValue('eightwothree', true)).toEqual(83);
    expect(findCalibrationValue('abcone2threexyz', true)).toEqual(13);
    expect(findCalibrationValue('xtwone3four', true)).toEqual(24);
    expect(findCalibrationValue('4nineeightseven2', true)).toEqual(42);
    expect(findCalibrationValue('zoneight234', true)).toEqual(14);
    expect(findCalibrationValue('7pqrstsixteen', true)).toEqual(76);
  });
});
