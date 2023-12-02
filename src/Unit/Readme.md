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
