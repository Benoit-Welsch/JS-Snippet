# ToolKit

- [CSV](#csv)
- [Scanner](#scanner)
- [Url](#url)
- [Unit](#unit)
<!-- - [Queue](#queue)
- [Unit](/lib/Unit/)
- [Url](/lib/Url/) -->

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

### CSV

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

### Scanner

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

### Url

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

### Unit

```typescript
import { Unit } from "./src";

// By default it will use 1000 as base 
// and K, M, G, T, P as units
const size = Unit.sizeToUnitAuto(1000);

size.n // 1
size.unit // K
size.toString() // 1.K
size.round(2) // 1.00
size.roundToString(2) // 1.00K

