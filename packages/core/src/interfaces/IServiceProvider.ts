import { ServiceIdentifier } from "../types/ServiceIdentifier";

export interface IServiceProvider {
  resolve<T>(id: ServiceIdentifier<T>): Promise<T>;
  tryResolve<T>(id: ServiceIdentifier<T>): Promise<T | undefined>;
}
