import { convertTime, sizeToUnitAuto, UnitTime } from '.';
import { describe, it, expect } from 'bun:test';
import { dataUnit, dataTime } from './value.test.json';

describe('Unit', () => {
  describe('Size', () => {
    it('Should convert size', () => {
      dataUnit.forEach((d) => {
        const { n, unit } = sizeToUnitAuto(d.number);
        expect(n).toBe(d.expect.n);
        expect(unit).toBe(d.expect.unit);
      });
    });
    it('Should convert size with custom units', () => {
      const units = ['PB', 'TB', 'GB', 'MB', 'KB', 'B'];
      dataUnit.forEach((d) => {
        const { n, unit } = sizeToUnitAuto(d.number, true, units);
        expect(n).toBe(d.expect.n);
        expect(unit).toBe(d.expect.unit + 'B');
      });
    });
    it('Should round size', () => {
      dataUnit.forEach((d) => {
        if (d.expect.round === undefined) return;
        const number = sizeToUnitAuto(d.number);
        const { r, n } = d.expect.round;
        const round = number.round(r);
        expect(round).toBe(n);
      });
    });
  });

  describe('Time', () => {
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
      });
    });
  });
});
