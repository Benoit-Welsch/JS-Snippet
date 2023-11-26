import { sizeToUnitAuto } from ".";
import { describe, it, expect } from "bun:test";

const data = [
  {
    number: 1002004000000000000,
    expect: {
      n: 1002.004,
      unit: "P",
    },
  },
  {
    number: 1002004000000000,
    expect: {
      n: 1.002004,
      unit: "P",
    },
  },
  {
    number: 1002004000000,
    expect: {
      n: 1.002004,
      unit: "T",
    },
  },
  {
    number: 1002004000,
    expect: {
      n: 1.002004,
      unit: "G",
    },
  },
  {
    number: 1002004,
    expect: {
      n: 1.002004,
      unit: "M",
    },
  },
  {
    number: 1002,
    expect: {
      n: 1.002,
      unit: "K",
    },
  },
  {
    number: 1000,
    expect: {
      n: 1,
      unit: "K",
    },
  },
  {
    number: 1,
    expect: {
      n: 1,
      unit: "",
    },
  },
  {
    number: 0,
    expect: {
      n: 0,
      unit: "",
    },
  },
];

describe("sizeToUnit", () => {
  it("should convert size to the appropriate unit", () => {
    data.forEach((d) => {
      const { n, unit } = sizeToUnitAuto(d.number);
      expect(n).toBe(d.expect.n);
      expect(unit).toBe(d.expect.unit);
    });
  });
});
