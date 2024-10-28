# 🛠️ ToolKit

[![Publish to NPM](https://github.com/Benoit-Welsch/ToolKitJs/actions/workflows/publish.yml/badge.svg)](https://github.com/Benoit-Welsch/ToolKitJs/actions/workflows/publish.yml)
[![Unit Test](https://github.com/Benoit-Welsch/ToolKitJs/actions/workflows/test.yml/badge.svg)](https://github.com/Benoit-Welsch/ToolKitJs/actions/workflows/test.yml)
[![npm version](https://badge.fury.io/js/%40lv00%2Ftoolkit.svg)](https://badge.fury.io/js/%40lv00%2Ftoolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Versatile JavaScript Toolkit for Everyday Use

## Table of Contents

- [Check](#check)
- [Csv](#csv)
- [Gen](#gen)
- [Log](#log)
- [Parser](#parser)
- [Plugin](#plugin)
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
import { CSV } from '@lv00/toolkit';

const csv = new CSV({ header: ['name', 'age'] });

// Add a line to the CSV
csv.addLine(['John', 20]);

// Add value one by one
csv.addSequentially('Jane & Doe');
csv.addSequentially(21);
csv.addSequentially('Jack');
csv.addSequentially(22);

// Get the CSV as string
csv.toString('|');

// Clear the CSV and keep the header
csv.clear();

// Convert the CSV to a JS object
csv.toObject();
// [
//   { name: 'John', age: 20 },
//   { name: 'Jane & Doe', age: 21 },
//   { name: 'Jack', age: 22 }
// ]

// Read CSV from string
const csv2 = CSV.readString('name,age\r\nJohn,20\r\nJane,21\r\nJack,22', ',');
csv2.toString('|');
```

### Gen

Generate pseudo-random data

#### random Name

```typescript
import { Gen } from '@lv00/toolkit';

const newName = Gen.randomName(); // antonelli-xenodochial
```

#### random Number

```typescript
import { Gen } from '@lv00/toolkit';

const newNumber = Gen.randomNumber(0, 100); // 42
```

### Log

Easily log to various outputs.

```typescript
import { Log } from 'lv00/toolkit';

const { Logger, Console, Level, File, Csv, Json } = Log;

// Define the endpoint of the log (transporter)
const logger = new Logger({
  t: [
    new Console(), // Log all levels to the console
    new File({ l: [Level.INFO], path: 'log.txt' }), // Log only INFO to a text based file
    new Csv({ l: [Level.ERROR], path: 'log.csv' }), // Log only ERROR to a CSV file
    new Json({ l: [Level.DEBUG], path: 'log.json' }), // Log only DEBUG to a JSON file
  ],
});

logger.log('Hello, World!'); // log to all transports registered for the level INFO
logger.log('Hello, World!', Level.ERROR); // log to all transports registered for the level ERROR

logger.info('Hello, World!');
logger.ok('Hello, World!');
logger.warn('Hello, World!');
logger.error('Hello, World!');
logger.debug('Hello, World!');

// Log an error
new Promise((_, reject) => {
  reject(new Error('Promise Error'));
}).catch((e) => logger.catch(e));
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

### Plugin

Lazy loading of plugins.

```typescript
import { Plugin } from "@lv00/toolkit";

// defined all the plugin in a folder
class myPlugin extends Plugin { 
  constructor() {
    super();
  }
}

Plugin.load("./path/to/your/plugin/folder");
```


### Scanner

Read folder synchronously without headache

```typescript
import { Scanner } from '@lv00/toolkit';

const scanner = Scanner.readFolder('./path/to/folder');

// Available properties
scanner.parent;
scanner.files;
scanner.folders;
scanner.path;

// return a array of files
scanner.flat();
// return json and remove circular references
scanner.toJson();
```

### Unit

Convert data to human readable format

```typescript
import { Unit } from './src';

// By default it will use 1000 as base
// and K, M, G, T, P as units
const size = Unit.sizeToUnitAuto(1000);

size.n; // 1
size.unit; // K
size.toString(); // 1K
size.round(2); // 1.00
size.roundToString(2); // 1.00K
```

### Url

Conveniently build urls with query parameters.

```typescript
import { Url, Uri } from '@lv00/toolkit';

const url = 'https://lv0.eu/';
const query = {
  p: '2',
  brand: ['sony', 'microsoft', 'nintendo'],
};

const q = Url.buildUrlWithQuery(url, query);
console.log(q.toString()); // https://lv0.eu/?p=2&brand=sony&brand=microsoft&brand=nintendo'

const uri = new Uri(
  url,
  "GET"
  query,
  )
const json = await uri.fetchJson()
```

