### Plugin

Lazy loading of plugins.

```typescript
import { Plugin } from "@lv00/toolkit";

// defined a plugin to exptend from (src/Plugin/index.ts)
export default class ExamplePlugin extends Plugin {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }
  execute() {
    return `Plugin ${this.name} executed`;
  }
}

// Create all the plugins you need

// Plugin 1 (src/Plugin/ExamplePlugin1.ts)
export default class ExamplePlugin1 extends ExamplePlugin {
  constructor() {
    super("1");
  }
}

// Plugin 2 (src/Plugin/ExamplePlugin2.ts)
export default class ExamplePlugin2 extends ExamplePlugin {
  constructor() {
    super("2");
  }
}

// Import the plugins 
Plugin.import("./src/Plugin/")
.forEach((plugin) => {
  const p = new plugin();
  p.execute();
});
// or
// Load all the plugins
Plugin.load("./src/Plugin/")
.forEach((plugin) => {
  plugin.execute();
});

```
