import { IServiceCollection } from "@community-platform/core";
import { ConfigManager } from "./ConfigManager";
import { DefaultConfigLoader } from "./loaders/DefaultConfigLoader";
import { ConfigRegistry } from "./ConfigRegistry";

export function registerConfigServices(collection: IServiceCollection): void {
  collection.registerSingleton(ConfigRegistry, ConfigRegistry);
  collection.registerSingleton(DefaultConfigLoader, DefaultConfigLoader);
  collection.registerSingleton(ConfigManager, ConfigManager, [DefaultConfigLoader, ConfigRegistry]);
}
