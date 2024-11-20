import { Plugin } from '..';

export class ExamplePlugin extends Plugin {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }
  execute() {
    return `Plugin ${this.name} executed`;
  }
}

export default class ExamplePlugin1 extends ExamplePlugin {
  constructor() {
    super('TestPlugin1');
  }
}
