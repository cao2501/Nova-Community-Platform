import { ServiceLifetime } from "./ServiceLifetime";
import { ServiceIdentifier, Newable } from "../types/ServiceIdentifier";
import { IServiceProvider } from "../interfaces/IServiceProvider";

export interface ServiceDescriptor<T = unknown> {
  readonly id: ServiceIdentifier<T>;
  readonly lifetime: ServiceLifetime;
  readonly implementation: Newable<T> | ((provider: IServiceProvider) => T | Promise<T>);
  readonly dependencies?: ServiceIdentifier[];
  readonly instance?: T;
}

export interface ServiceDescriptorOptions<T = unknown> {
  id: ServiceIdentifier<T>;
  lifetime: ServiceLifetime;
  implementation: Newable<T> | ((provider: IServiceProvider) => T | Promise<T>);
  readonly dependencies?: ServiceIdentifier[];
  instance?: T;
}
