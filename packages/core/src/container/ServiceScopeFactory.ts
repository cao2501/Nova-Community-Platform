import { IServiceScopeFactory } from "../interfaces/IServiceScopeFactory";
import { ServiceScope } from "./ServiceScope";
import { ServiceCollection } from "./ServiceCollection";
import { ServiceProvider } from "./ServiceProvider";

export class ServiceScopeFactory implements IServiceScopeFactory {
  constructor(private readonly collection: ServiceCollection) {}

  createScope(): ServiceScope {
    const scopedInstances = new Map();
    const disposeActions: Array<() => Promise<void>> = [];
    const provider = new ServiceProvider(this.collection, scopedInstances, disposeActions);
    return new ServiceScope(provider, disposeActions);
  }
}
