import { IConfigProvider } from "../interfaces/IConfigProvider";
import { ConfigData } from "../types/ConfigData";
import { promises as fs } from "fs";

export class JsonConfigProvider implements IConfigProvider {
  public readonly name = "json";

  constructor(private readonly path: string) {}

  async load(): Promise<ConfigData> {
    const content = await fs.readFile(this.path, "utf8");
    return JSON.parse(content) as ConfigData;
  }
}
