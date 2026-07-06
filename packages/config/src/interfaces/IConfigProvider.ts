import { ConfigData } from "../types/ConfigData";

export interface IConfigProvider {
  readonly name: string;
  load(): Promise<ConfigData>;
}
