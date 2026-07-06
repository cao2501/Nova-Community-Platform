import { ServiceIdentifier } from "../types/ServiceIdentifier";

export class DuplicateRegistrationError extends Error {
  constructor(id: ServiceIdentifier) {
    const identifier = typeof id === "string" ? id : id.toString();
    super(`Duplicate registration for identifier: ${identifier}`);
    this.name = "DuplicateRegistrationError";
  }
}
