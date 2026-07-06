import { IConfigProvider } from "./IConfigProvider";
import { ConfigData } from "../types/ConfigData";

export interface IConfigLoader {
  registerProvider(provider: IConfigProvider): void;
  load(): Promise<ConfigData>;
  getProviders(): readonly IConfigProvider[];
}
