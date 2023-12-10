### Parser

Parse data to object.

#### Dot

```typescript
import { Parser } from "@lv00/toolkit";

const data = `battery.charge: 100
battery.charge.low: 20
battery.runtime: 995
battery.type: PbAc
device.mfr: EATON
device.model: Ellipse PRO 650
device.serial: P354M05BE0
device.type: ups
driver.name: usbhid-ups`;

const result = dot(data);
console.log(result);
// Will return the following object
{
  battery: {
    charge: {
      _value: "100",
      low: "20",
    },
    runtime: "995",
    type: "PbAc",
  },
  device: {
    mfr: "EATON",
    model: "Ellipse PRO 650",
    serial: "P354M05BE0",
    type: "ups",
  },
  driver: {
    name: "usbhid-ups",
  },
}
```
