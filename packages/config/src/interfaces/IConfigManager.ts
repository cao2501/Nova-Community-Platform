import { ConfigEnvironment } from "../types/ConfigEnvironment";
import { ConfigData } from "../types/ConfigData";
import { IConfigProvider } from "./IConfigProvider";
import { ConfigSchema } from "../schemas/ConfigSchema";

export interface IConfigManager {
  get<T = unknown>(key: string): T;
  getOrDefault<T = unknown>(key: string, defaultValue: T): T;
  contains(key: string): boolean;
  reload(): Promise<void>;
  validate(): void;
  registerProvider(provider: IConfigProvider): void;
  registerSchema(key: string, schema: ConfigSchema): void;
  getEnvironment(): ConfigEnvironment;
  getAll(): ConfigData;
}
