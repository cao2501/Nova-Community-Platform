import { ConfigData } from "../types/ConfigData";

export class ConfigMerger {
  // Simple shallow merge: later sources overwrite earlier ones.
  merge(sources: ConfigData[]): ConfigData {
    const result: ConfigData = {};
    for (const src of sources) {
      Object.assign(result, src);
    }
    return result;
  }
}
