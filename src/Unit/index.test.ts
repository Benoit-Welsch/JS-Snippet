import { convertTime, sizeToUnitAuto, UnitTime } from '.';
import { describe, it, expect } from 'bun:test';
import { dataUnit, dataTime } from './value.test.json';

describe('Unit', () => {
  it('Should convert file size to the appropriate unit', () => {
    dataUnit.forEach((d) => {
      const { n, unit } = sizeToUnitAuto(d.number);
      expect(n).toBe(d.expect.n);
      expect(unit).toBe(d.expect.unit);
    });
  });

  it('Should convert time from a unit to another', () => {
    const data = dataTime as {
      number: number;
      from: UnitTime;
      to: UnitTime;
      expect: { n: number; unit: UnitTime };
    }[];
    data.forEach((d) => {
      const time = convertTime(d.number, d.from, d.to);
      expect(time.n).toBe(d.expect.n);
      expect(time.unit).toBe(d.expect.unit);
      console.log(time.humanReadable());
    });
  });
});
