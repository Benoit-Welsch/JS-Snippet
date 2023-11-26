type Unit = 'P' | 'T' | 'G' | 'M' | 'K' | '';

const defaultUnits: Unit[] = ['P', 'T', 'G', 'M', 'K', ''];

export const sizeToUnitAuto = (n: number, si = true, units?: string[]) => {
  units = units || defaultUnits;
  const power = si ? 1000 : 1024;
  let unitIndex = units.findIndex((_, key) => {
    // @ts-ignore
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
