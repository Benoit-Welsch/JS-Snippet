import { it } from "node:test";
import { strict as assert } from "node:assert";
import { sizeToUnit } from "./Unit.js";

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
  ,
  {
    number: 0,
    expect: {
      n: 0,
      unit: "",
    },
  },
];

it("should get correct unit", () => {
  data.forEach((d) => {
    const r = sizeToUnit(d.number);
    assert.equal(d.expect.n, r.n);
    assert.equal(d.expect.unit, r.unit);
  });
});
