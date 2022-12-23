import { it } from "node:test";
import { strict as assert } from "node:assert";
import { buildUrlWithQuery, isIp } from "./Url.js";

it("Should get a url with query", () => {
  const query = {
    p: 2,
    brand: ["sony", "microsoft", "nintendo"],
  };
  const url = buildUrlWithQuery("https://lv0.eu/", query);
  assert.equal(
    decodeURIComponent(url.toString()),
    "https://lv0.eu/?p=2&brand=sony&brand=microsoft&brand=nintendo"
  );
});

it("Should check a good ip", () => {
  //Good Ip
  ["127.0.0.1", "192.168.1.1"].forEach((ip) => {
    assert.ok(isIp(ip), `${ip} should return true -> returned false`);
  });
});

it("Should check a bad ip", () => {
  //Bad Ip
  ["127.0.0", "192.168.1.1.1"].forEach((ip) => {
    assert.ok(!isIp(ip), `${ip} should return true -> returned false`);
  });
});