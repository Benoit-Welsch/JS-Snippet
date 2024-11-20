import { describe, it, expect } from 'bun:test';
import { Plugin } from './index';
// Example Plugin for testing
class ExamplePlugin extends Plugin {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }
  execute() {
    return `Plugin ${this.name} executed`;
  }
}

describe('Plugin', () => {
  it('should create a plugin instance', () => {
    const plugin = new ExamplePlugin('TestPlugin');
    expect(plugin).toBeInstanceOf(Plugin);
    expect(plugin.name).toBe('TestPlugin');
  });

  it('should load plugins from a folder', async () => {
    const plugins = await Plugin.load<ExamplePlugin>('./src/Plugin/test');
    expect(plugins).toHaveLength(2);
  });

  it('should import plugins from a folder', async () => {
    const plugins =
      await Plugin.import<typeof ExamplePlugin>('./src/Plugin/test');
    const test = plugins.map((plugin) => new plugin('TestPlugin'));
    console.log(test);
    expect(plugins).toHaveLength(2);
  });
});
