import { IConfigRegistry } from "./interfaces/IConfigRegistry";
import { ConfigSchema } from "./schemas/ConfigSchema";

export class ConfigRegistry implements IConfigRegistry {
  private readonly schemas = new Map<string, ConfigSchema>();

  registerSchema(key: string, schema: ConfigSchema): void {
    this.schemas.set(key, schema);
  }

  getSchema(key: string): ConfigSchema | undefined {
    return this.schemas.get(key);
  }

  containsSchema(key: string): boolean {
    return this.schemas.has(key);
  }

  getAllSchemas(): ReadonlyMap<string, ConfigSchema> {
    return this.schemas;
  }
}
