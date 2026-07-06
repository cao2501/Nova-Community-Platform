import { IConfigLoader } from "../interfaces/IConfigLoader";
import { IConfigProvider } from "../interfaces/IConfigProvider";
import { ConfigData } from "../types/ConfigData";

export class DefaultConfigLoader implements IConfigLoader {
  private readonly providers: IConfigProvider[] = [];

  registerProvider(provider: IConfigProvider): void {
    this.providers.push(provider);
  }

  async load(): Promise<ConfigData> {
    const result: ConfigData = {};

    for (const provider of this.providers) {
      const data = await provider.load();
      Object.assign(result, data);
    }

    return result;
  }

  getProviders(): readonly IConfigProvider[] {
    return this.providers;
  }
}
