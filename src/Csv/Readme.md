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