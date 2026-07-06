import { IContainer } from "../interfaces/IContainer";
import { IServiceProvider } from "../interfaces/IServiceProvider";
import { IServiceScope } from "../interfaces/IServiceScope";
import { IServiceScopeFactory } from "../interfaces/IServiceScopeFactory";
import { ServiceCollection } from "./ServiceCollection";
import { ServiceScopeFactory } from "./ServiceScopeFactory";
import { ServiceIdentifier, Newable } from "../types/ServiceIdentifier";

export class Container implements IContainer {
  private readonly collection = new ServiceCollection();
  private readonly scopeFactory = new ServiceScopeFactory(this.collection);

  register<T>(
    id: ServiceIdentifier<T>,
    implementation: Newable<T> | ((provider: IServiceProvider) => T | Promise<T>),
    lifetime: ServiceLifetime,
    dependencies: ServiceIdentifier[] = [],
  ): IServiceCollection {
    return this.collection.register(id, implementation, lifetime, dependencies);
  }

  registerSingleton<T>(
    id: ServiceIdentifier<T>,
    implementation: Newable<T> | ((provider: IServiceProvider) => T | Promise<T>) | T,
    dependencies: ServiceIdentifier[] = [],
  ): IServiceCollection {
    return this.collection.registerSingleton(id, implementation, dependencies);
  }

  registerScoped<T>(
    id: ServiceIdentifier<T>,
    implementation: Newable<T> | ((provider: IServiceProvider) => T | Promise<T>),
    dependencies: ServiceIdentifier[] = [],
  ): IServiceCollection {
    return this.collection.registerScoped(id, implementation, dependencies);
  }

  registerTransient<T>(
    id: ServiceIdentifier<T>,
    implementation: Newable<T> | ((provider: IServiceProvider) => T | Promise<T>),
    dependencies: ServiceIdentifier[] = [],
  ): IServiceCollection {
    return this.collection.registerTransient(id, implementation, dependencies);
  }

  addDescriptor<T>(descriptor: ServiceDescriptor<T>): IServiceCollection {
    return this.collection.addDescriptor(descriptor);
  }

  async resolve<T>(id: ServiceIdentifier<T>): Promise<T> {
    const scope = this.createScope();
    try {
      return await scope.serviceProvider.resolve(id);
    } finally {
      await scope.dispose();
    }
  }

  async tryResolve<T>(id: ServiceIdentifier<T>): Promise<T | undefined> {
    const scope = this.createScope();
    try {
      return await scope.serviceProvider.tryResolve(id);
    } finally {
      await scope.dispose();
    }
  }

  createScope(): IServiceScope {
    return this.scopeFactory.createScope();
  }

  async dispose(): Promise<void> {
    await this.collection.dispose();
  }
}
