import { ConfigData } from "../types/ConfigData";
import { ConfigSchema } from "../schemas/ConfigSchema";
import { ConfigurationError } from "../errors/ConfigurationError";

export class ConfigValidator {
  validate(config: ConfigData, schema: ConfigSchema, path = ""): void {
    const missingFields: string[] = [];

    if (schema.required && config == null) {
      throw new ConfigurationError(`${path || "config"} is required but missing.`);
    }

    if (schema.type === "object" && schema.properties) {
      for (const [key, propertySchema] of Object.entries(schema.properties)) {
        const propertyPath = path ? `${path}.${key}` : key;
        const value = config ? (config as Record<string, unknown>)[key] : undefined;

        if (value === undefined || value === null) {
          if (propertySchema.required) {
            missingFields.push(propertyPath);
          }
          continue;
        }

        this.validate(value as ConfigData, propertySchema, propertyPath);
      }

      if (missingFields.length > 0) {
        throw new ConfigurationError(`Missing required configuration fields: ${missingFields.join(", ")}`);
      }
      return;
    }

    if (schema.required && (config === undefined || config === null || config === "")) {
      throw new ConfigurationError(`${path || "config"} is required but missing.`);
    }

    if (!this.matchesType(config, schema.type)) {
      throw new ConfigurationError(`${path || "config"} must be of type ${schema.type}.`);
    }
  }

  private matchesType(value: unknown, type: ConfigSchema["type"]): boolean {
    if (value === undefined || value === null) {
      return false;
    }

    if (type === "array") {
      return Array.isArray(value);
    }

    return typeof value === type;
  }
}
