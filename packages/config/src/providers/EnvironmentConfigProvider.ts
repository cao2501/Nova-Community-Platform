import { IConfigProvider } from "../interfaces/IConfigProvider";
import { ConfigData } from "../types/ConfigData";

export class EnvironmentConfigProvider implements IConfigProvider {
  public readonly name = "environment";

  constructor(private readonly prefix = "") {}

  async load(): Promise<ConfigData> {
    const result: ConfigData = {};

    for (const [rawKey, rawValue] of Object.entries(process.env)) {
      if (!rawKey) {
        continue;
      }

      const key = this.prefix ? rawKey.replace(`${this.prefix}_`, "") : rawKey;
      result[key] = rawValue;
    }

    return result;
  }
}
