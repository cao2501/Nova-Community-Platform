export interface ConfigSchema {
  required?: boolean;
  type: "string" | "number" | "boolean" | "object" | "array";
  default?: unknown;
  properties?: Record<string, ConfigSchema>;
}
