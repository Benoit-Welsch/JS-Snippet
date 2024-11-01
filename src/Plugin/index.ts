import path from 'path';
import { Scanner } from '..';

export interface modelValue {
  default?: string | number | boolean;
  type: 'string' | 'number' | 'boolean';
  required?: boolean;
  min?: number;
  max?: number;
  regex?: RegExp;
}

export interface BaseModelObj {
  [key: string]: modelValue;
}

export class Plugin {
  static _model: BaseModelObj;
  static _prefix: string;
  static _loadEnv?: boolean = false;

  static load = async <T extends Plugin>(folder: string): Promise<T[]> => {
    const plugins = await Plugin.import<T>(folder);

    return plugins
      .map((plugin) => {
        if (!plugin._loadEnv) return new plugin();

        throw new Error('Loading env not implemented');
        // const envPrefix = pluginClass._prefix || pluginClass.name;
        // const env = parseEnv(envPrefix);
        // if(!plugin._model)return new pluginClass(env);
        // checkConfig(env, pluginClass._model, envPrefix);
        // return new pluginClass(env);
      })
      .filter((plugin) => plugin && plugin !== null) as Plugin[];
  };

  static import = async <T extends Plugin>(folder: string): Promise<T[]> => {
    const plugins = Scanner.readFolder(folder).files.filter(
      (file) => !file.name.includes('index'),
    );

    return Promise.all(
      plugins.map(async (plugin) => {
        let pluginPath;
        pluginPath = path.join(plugin.path, plugin.name);
        pluginPath = path.resolve(pluginPath);
        const pluginModule = await import(pluginPath);
        const pluginClass = pluginModule.default;

        // Ignore non-plugin files
        if (!(pluginClass.prototype instanceof Plugin)) {
          throw new Error(`${plugin.name} is not a valid plugin`);
        }

        return pluginClass as T;
      }),
    );
  };
}
