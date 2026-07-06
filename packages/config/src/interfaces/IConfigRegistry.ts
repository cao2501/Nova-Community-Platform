import { ConfigSchema } from "../schemas/ConfigSchema";

export interface IConfigRegistry {
  registerSchema(key: string, schema: ConfigSchema): void;
  getSchema(key: string): ConfigSchema | undefined;
  containsSchema(key: string): boolean;
  getAllSchemas(): ReadonlyMap<string, ConfigSchema>;
}
