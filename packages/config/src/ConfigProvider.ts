import { IConfigProvider } from "./interfaces/IConfigProvider";
import { ConfigData } from "./types/ConfigData";

export class ConfigProvider implements IConfigProvider {
  public readonly name = "provider";

  constructor(private readonly loader: () => Promise<ConfigData>) {}

  async load(): Promise<ConfigData> {
    return this.loader();
  }
}
