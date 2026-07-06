import { MetadataScanner } from "./MetadataScanner";

export class ReflectionService {
  constructor(private readonly scanner = new MetadataScanner()) {}

  getProperties(target: object): string[] {
    return this.scanner.scan(target);
  }
}
