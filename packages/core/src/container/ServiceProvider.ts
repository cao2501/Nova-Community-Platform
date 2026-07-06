import { IServiceProvider } from "../interfaces/IServiceProvider";
import { ServiceCollection } from "./ServiceCollection";
import { ServiceDescriptor } from "../descriptors/ServiceDescriptor";
import { ServiceLifetime } from "../descriptors/ServiceLifetime";
import { ServiceIdentifier, Newable } from "../types/ServiceIdentifier";
import { CircularDependencyError } from "../errors/CircularDependencyError";
import { ServiceNotFoundError } from "../errors/ServiceNotFoundError";

export class ServiceProvider implements IServiceProvider {
  private readonly resolving = new Set<ServiceIdentifier>();

  constructor(
    private readonly collection: ServiceCollection,
    private readonly scopedInstances: Map<ServiceIdentifier, unknown>,
    private readonly disposeActions: Array<() => Promise<void>>,
  ) {}

  async resolve<T>(id: ServiceIdentifier<T>): Promise<T> {
    return this.resolveInternal(id);
  }

  async tryResolve<T>(id: ServiceIdentifier<T>): Promise<T | undefined> {
    try {
      return await this.resolveInternal(id);
    } catch (error) {
      if (error instanceof ServiceNotFoundError) {
        return undefined;
      }
      throw error;
    }
  }

  private async resolveInternal<T>(id: ServiceIdentifier<T>): Promise<T> {
    if (this.resolving.has(id)) {
      throw new CircularDependencyError([...this.resolving, id]);
    }

    const descriptor = this.collection.getDescriptor(id);
    if (!descriptor) {
      throw new ServiceNotFoundError(id);
    }

    this.resolving.add(id);
    try {
      switch (descriptor.lifetime) {
        case ServiceLifetime.Singleton: {
          if (this.collection.getSingletonInstance(id) !== undefined) {
            return this.collection.getSingletonInstance(id) as T;
          }

          if (descriptor.instance !== undefined) {
            const instance = descriptor.instance as T;
            this.collection.setSingletonInstance(id, instance);
            return instance;
          }

          const instance = await this.createInstance(descriptor);
          this.collection.setSingletonInstance(id, instance);
          return instance;
        }

        case ServiceLifetime.Scoped: {
          if (this.scopedInstances.has(id)) {
            return this.scopedInstances.get(id) as T;
          }

          const instance = await this.createInstance(descriptor);
          this.scopedInstances.set(id, instance);
          return instance;
        }

        case ServiceLifetime.Transient: {
          return this.createInstance(descriptor);
        }

        default:
          throw new ServiceNotFoundError(id);
      }
    } finally {
      this.resolving.delete(id);
    }
  }

  private async createInstance<T>(descriptor: ServiceDescriptor<T>): Promise<T> {
    const implementation = descriptor.implementation;
    const instance = this.isFactory(implementation)
      ? await implementation(this)
      : new (implementation as Newable<T>)(...
          (await this.resolveConstructorDependencies(descriptor.dependencies ?? [], this)),
        );

    if (descriptor.lifetime === ServiceLifetime.Singleton && this.isDisposable(instance)) {
      this.collection.addRootDisposeAction(async () => instance.dispose());
    }

    if (descriptor.lifetime !== ServiceLifetime.Singleton && this.isDisposable(instance)) {
      this.disposeActions.push(async () => instance.dispose());
    }

    return instance;
  }

  private async resolveConstructorDependencies(
    dependencies: ServiceIdentifier[],
    provider: IServiceProvider,
  ): Promise<unknown[]> {
    return Promise.all(dependencies.map((dependency) => provider.resolve(dependency)));
  }

  private isFactory<T>(implementation: Newable<T> | ((provider: IServiceProvider) => T | Promise<T>)):
    implementation is (provider: IServiceProvider) => T | Promise<T> {
    return typeof implementation === "function" && !(implementation as Newable<T>).prototype;
  }

  private isDisposable(instance: unknown): instance is { dispose(): Promise<void> } {
    return typeof instance === "object" && instance !== null && typeof (instance as { dispose?: unknown }).dispose === "function";
  }
}
