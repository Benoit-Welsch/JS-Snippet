import { it, expect } from "bun:test";
import { buildUrlWithQuery, isIp } from "./";

it("Should get a url with query", () => {
  const query = {
    p: "2",
    brand: ["sony", "microsoft", "nintendo"],
  };
  const url = buildUrlWithQuery("https://lv0.eu/", query);
  expect(url.toString()).toBe(
    "https://lv0.eu/?p=2&brand=sony&brand=microsoft&brand=nintendo",
  );
});

it("Should check a good ip", () => {
  //Good Ip
  ["127.0.0.1", "192.168.1.1"].forEach((ip) => {
    expect(isIp(ip)).toBe(true);
  });
});

it("Should check a bad ip", () => {
  //Bad Ip
  ["127.0.0", "192.168.1.1.1"].forEach((ip) => {
    expect(isIp(ip)).toBe(false);
  });
});
