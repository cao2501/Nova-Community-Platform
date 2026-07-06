import { ServiceIdentifier } from "../types/ServiceIdentifier";

export class ServiceNotFoundError extends Error {
  constructor(id: ServiceIdentifier) {
    const identifier = typeof id === "string" ? id : id.toString();
    super(`Service not found for identifier: ${identifier}`);
    this.name = "ServiceNotFoundError";
  }
}
