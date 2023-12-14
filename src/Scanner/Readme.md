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
