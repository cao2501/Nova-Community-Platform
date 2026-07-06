import { ServiceIdentifier } from "../types/ServiceIdentifier";

export class CircularDependencyError extends Error {
  constructor(path: Array<ServiceIdentifier>) {
    const formattedPath = path.map((identifier) => (typeof identifier === "string" ? identifier : identifier.toString())).join(" -> ");
    super(`Circular dependency detected: ${formattedPath}`);
    this.name = "CircularDependencyError";
  }
}
