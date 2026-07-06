import { IConfigProvider } from "../interfaces/IConfigProvider";
import { ConfigData } from "../types/ConfigData";

export class MemoryConfigProvider implements IConfigProvider {
  public readonly name = "memory";

  constructor(private readonly values: ConfigData) {}

  async load(): Promise<ConfigData> {
    return { ...this.values };
  }
}
