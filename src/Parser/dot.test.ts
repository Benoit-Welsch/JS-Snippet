import { describe, it, expect } from 'bun:test';
import { dot } from './dot';

const data = `battery.charge: 100
battery.charge.low: 20
battery.runtime: 995
battery.type: PbAc
device.mfr: EATON
device.model: Ellipse PRO 650
device.serial: P354M05BE0
device.type: ups
driver.name: usbhid-ups`;

describe('dot parser', () => {
  it('should parse the dot data correctly', () => {
    const result = dot(data);
    expect(result).toEqual({
      battery: {
        charge: { _value: '100', low: '20' },
        runtime: '995',
        type: 'PbAc',
      },
      device: {
        mfr: 'EATON',
        model: 'Ellipse PRO 650',
        serial: 'P354M05BE0',
        type: 'ups',
      },
      driver: { name: 'usbhid-ups' },
    });
  });

  it('should parse the dot data correctly with custom conflict char', () => {
    const result = dot(data, '$');
    expect(result).toEqual({
      battery: {
        charge: { $value: '100', low: '20' },
        runtime: '995',
        type: 'PbAc',
      },
      device: {
        mfr: 'EATON',
        model: 'Ellipse PRO 650',
        serial: 'P354M05BE0',
        type: 'ups',
      },
      driver: { name: 'usbhid-ups' },
    });
  });
});
