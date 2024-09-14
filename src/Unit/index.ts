type UnitSize = 'P' | 'T' | 'G' | 'M' | 'K' | '';

const defaultUnitsSize: UnitSize[] = ['P', 'T', 'G', 'M', 'K', ''];

export const sizeToUnitAuto = (n: number, si = true, units?: string[]) => {
  units = units || defaultUnitsSize;
  const power = si ? 1000 : 1024;
  let unitIndex = units.findIndex((_, key) => {
    return n / Math.pow(power, units.length - key - 1) >= 1;
  });
  if (unitIndex == -1) unitIndex = units.length - 1;
  return {
    n: n / Math.pow(power, units.length - unitIndex - 1),
    unit: units[unitIndex],
    toString: function () {
      return this.n + this.unit;
    },
    round: function (r = 3) {
      // q = number of decimal number
      const q = Math.pow(10, r);
      return Math.round(this.n * q) / q;
    },
    roundToString: function (r = 3) {
      return this.round(r) + this.unit;
    },
  };
};

export type UnitTime = 'y' | 'd' | 'h' | 'm' | 's' | 'ms';
const defaultUnitsTime: UnitTime[] = ['y', 'd', 'h', 'm', 's', 'ms'];
const power = [31536000000, 86400000, 3600000, 60000, 1000, 1];

export const convertTime = (n: number, from: UnitTime, to: UnitTime) => {
  from = from.toLowerCase() as UnitTime;
  to = to.toLowerCase() as UnitTime;
  const valueInms = n * power[defaultUnitsTime.indexOf(from)];
  const unitIndex = defaultUnitsTime.indexOf(to);
  return {
    n: valueInms / power[unitIndex],
    unit: defaultUnitsTime[unitIndex],
    toString: function () {
      return this.n + this.unit;
    },
    humanReadable: function (): string {
      const round = this.round(0);
      const rest = valueInms - round * power[unitIndex];
      return round + this.unit + (rest > 0 ? ` ${convertTime(rest, defaultUnitsTime[unitIndex], defaultUnitsTime[unitIndex + 1]).humanReadable()}` : '');
    },
    round: function (r = 3) {
      // q = number of decimal number
      const q = Math.pow(10, r);
      return Math.round(this.n * q) / q;
    },
    roundToString: function (r = 3) {
      return this.round(r) + this.unit;
    },
  };
}