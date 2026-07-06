export class MetadataScanner {
  scan(target: object): string[] {
    return Object.getOwnPropertyNames(target);
  }
}
