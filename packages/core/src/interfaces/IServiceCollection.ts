import { ServiceDescriptor } from "../descriptors/ServiceDescriptor";
import { ServiceLifetime } from "../descriptors/ServiceLifetime";
import { ServiceIdentifier, Newable } from "../types/ServiceIdentifier";
import { IServiceProvider } from "./IServiceProvider";

export interface IServiceCollection {
  register<T>(
    id: ServiceIdentifier<T>,
    implementation: Newable<T> | ((provider: IServiceProvider) => T | Promise<T>),
    lifetime: ServiceLifetime,
    dependencies?: ServiceIdentifier[],
  ): IServiceCollection;

  registerSingleton<T>(
    id: ServiceIdentifier<T>,
    implementation: Newable<T> | ((provider: IServiceProvider) => T | Promise<T>) | T,
    dependencies?: ServiceIdentifier[],
  ): IServiceCollection;

  registerScoped<T>(
    id: ServiceIdentifier<T>,
    implementation: Newable<T> | ((provider: IServiceProvider) => T | Promise<T>),
    dependencies?: ServiceIdentifier[],
  ): IServiceCollection;

  registerTransient<T>(
    id: ServiceIdentifier<T>,
    implementation: Newable<T> | ((provider: IServiceProvider) => T | Promise<T>),
    dependencies?: ServiceIdentifier[],
  ): IServiceCollection;

  addDescriptor<T>(descriptor: ServiceDescriptor<T>): IServiceCollection;
}
