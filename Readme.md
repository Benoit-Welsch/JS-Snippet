# ToolKit

- [Check](#check)
- [Csv](#csv)
- [Parser](#parser)
- [Queue](#queue)
- [Scanner](#scanner)
- [Unit](#unit)
- [Url](#url)

## Installation

```bash
npm install @lv00/toolkit # or
pnpm install @lv00/toolkit # or
yarn add @lv00/toolkit # or
bun install @lv00/toolkit
```

## Usage

```typescript
import { ... } from "@lv00/toolkit";
```

### Check

Easily check data type and format.

```typescript
import { Is } from "@lv00/toolkit";

is.ip('127.0.0.1'); // true
is.ip('1.1.1'); // false

is.email('test@test.local'); // true
is.email('test@test'); // false

... // use intellisense to see more
```

### CSV

Create CSV on the fly.

```typescript
import { CSV } from "@lv00/toolkit";

const csv = new CSV({ header: ["name", "age"] });

// Add a line to the CSV
csv.addLine(["John", 20]);

// Add value one by one
csv.addSequentially("Jane & Doe");
csv.addSequentially(21);
csv.addSequentially("Jack");
csv.addSequentially(22);

// Get the CSV as string
csv.toString("|");

// Clear the CSV and keep the header
csv.clear();
```

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

### Scanner

Read folder synchronously without headache

```typescript
import { Scanner } from "@lv00/toolkit";

const scanner = Scanner.readFolder("./path/to/folder");

// Available properties
scanner.parent;
scanner.files;
scanner.folders;
scanner.path;

// return a array of folders
scanner.flat();
// return json and remove circular references
scanner.toJson();
```

### Unit

Convert data to human readable format

```typescript
import { Unit } from "./src";

// By default it will use 1000 as base
// and K, M, G, T, P as units
const size = Unit.sizeToUnitAuto(1000);

size.n; // 1
size.unit; // K
size.toString(); // 1.K
size.round(2); // 1.00
size.roundToString(2); // 1.00K
```

### Url

Conveniently build urls with query parameters.

```typescript
import { Url } from "@lv00/toolkit";

const url = "https://lv0.eu/";
const query = {
  p: "2",
  brand: ["sony", "microsoft", "nintendo"],
};

const q = Url.buildUrlWithQuery(url, query);
console.log(q.toString()); // https://lv0.eu/?p=2&brand=sony&brand=microsoft&brand=nintendo'
```
