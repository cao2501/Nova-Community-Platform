import { IConfigManager } from "./interfaces/IConfigManager";
import { IConfigLoader } from "./interfaces/IConfigLoader";
import { IConfigProvider } from "./interfaces/IConfigProvider";
import { IConfigRegistry } from "./interfaces/IConfigRegistry";
import { ConfigData, ConfigEnvironment } from "./types";
import { ConfigSchema } from "./schemas/ConfigSchema";
import { ConfigValidator } from "./validation/ConfigValidator";
import { ConfigurationError } from "./errors/ConfigurationError";

export class ConfigManager implements IConfigManager {
  private config: ConfigData = {};
  private environment: ConfigEnvironment;

  constructor(
    private readonly loader: IConfigLoader,
    private readonly registry: IConfigRegistry,
    private readonly validator = new ConfigValidator(),
    environment?: ConfigEnvironment,
  ) {
    this.environment = environment ?? this.getEnvironmentFromNode();
  }

  get<T = unknown>(key: string): T {
    if (!this.contains(key)) {
      throw new ConfigurationError(`Configuration value for key '${key}' not found.`);
    }
    return this.config[key] as T;
  }

  getOrDefault<T = unknown>(key: string, defaultValue: T): T {
    return this.contains(key) ? (this.config[key] as T) : defaultValue;
  }

  contains(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.config, key);
  }

  async reload(): Promise<void> {
    this.config = await this.loader.load();
    this.validate();
  }

  validate(): void {
    for (const [key, schema] of this.registry.getAllSchemas()) {
      const value = this.config[key];
      this.validator.validate(value as unknown, schema, key);
    }
  }

  registerProvider(provider: IConfigProvider): void {
    this.loader.registerProvider(provider);
  }

  registerSchema(key: string, schema: ConfigSchema): void {
    this.registry.registerSchema(key, schema);
  }

  getEnvironment(): ConfigEnvironment {
    return this.environment;
  }

  getAll(): ConfigData {
    return { ...this.config };
  }

  private getEnvironmentFromNode(): ConfigEnvironment {
    const environment = process.env.NODE_ENV as ConfigEnvironment | undefined;
    if (environment === "development" || environment === "test" || environment === "production") {
      return environment;
    }
    return "development";
  }
}
