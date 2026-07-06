import { ServiceLifetime } from "../descriptors/ServiceLifetime";
import { ServiceDescriptor } from "../descriptors/ServiceDescriptor";
import { DuplicateRegistrationError } from "../errors/DuplicateRegistrationError";
import { IServiceCollection } from "../interfaces/IServiceCollection";
import { IServiceProvider } from "../interfaces/IServiceProvider";
import { ServiceIdentifier, Newable } from "../types/ServiceIdentifier";

interface InternalDescriptor<T = unknown> extends ServiceDescriptor<T> {
  readonly dependencies?: ServiceIdentifier[];
}

export class ServiceCollection implements IServiceCollection {
  private readonly descriptors = new Map<ServiceIdentifier, InternalDescriptor>();
  private readonly singletonInstances = new Map<ServiceIdentifier, unknown>();
  private readonly rootDisposeActions: Array<() => Promise<void>> = [];

  register<T>(
    id: ServiceIdentifier<T>,
    implementation: Newable<T> | ((provider: IServiceProvider) => T | Promise<T>),
    lifetime: ServiceLifetime,
    dependencies: ServiceIdentifier[] = [],
  ): IServiceCollection {
    if (this.descriptors.has(id)) {
      throw new DuplicateRegistrationError(id);
    }

    this.descriptors.set(id, {
      id,
      lifetime,
      implementation,
      dependencies,
    } as InternalDescriptor<T>);

    return this;
  }

  registerSingleton<T>(
    id: ServiceIdentifier<T>,
    implementation: Newable<T> | ((provider: IServiceProvider) => T | Promise<T>) | T,
    dependencies: ServiceIdentifier[] = [],
  ): IServiceCollection {
    if (this.descriptors.has(id)) {
      throw new DuplicateRegistrationError(id);
    }

    const descriptor: InternalDescriptor<T> = {
      id,
      lifetime: ServiceLifetime.Singleton,
      implementation: implementation as Newable<T> | ((provider: IServiceProvider) => T | Promise<T>),
      dependencies,
    };

    if (typeof implementation === "object" && implementation !== null) {
      descriptor.instance = implementation as T;
      this.singletonInstances.set(id, implementation);

      if (this.isDisposable(implementation)) {
        this.rootDisposeActions.push(async () => implementation.dispose());
      }
    }

    this.descriptors.set(id, descriptor);
    return this;
  }

  registerScoped<T>(
    id: ServiceIdentifier<T>,
    implementation: Newable<T> | ((provider: IServiceProvider) => T | Promise<T>),
    dependencies: ServiceIdentifier[] = [],
  ): IServiceCollection {
    return this.register(id, implementation, ServiceLifetime.Scoped, dependencies);
  }

  registerTransient<T>(
    id: ServiceIdentifier<T>,
    implementation: Newable<T> | ((provider: IServiceProvider) => T | Promise<T>),
    dependencies: ServiceIdentifier[] = [],
  ): IServiceCollection {
    return this.register(id, implementation, ServiceLifetime.Transient, dependencies);
  }

  addDescriptor<T>(descriptor: ServiceDescriptor<T>): IServiceCollection {
    if (this.descriptors.has(descriptor.id)) {
      throw new DuplicateRegistrationError(descriptor.id);
    }

    this.descriptors.set(descriptor.id, descriptor as InternalDescriptor<T>);
    return this;
  }

  getDescriptor<T>(id: ServiceIdentifier<T>): InternalDescriptor<T> | undefined {
    return this.descriptors.get(id) as InternalDescriptor<T> | undefined;
  }

  getSingletonInstance<T>(id: ServiceIdentifier<T>): T | undefined {
    return this.singletonInstances.get(id) as T | undefined;
  }

  setSingletonInstance<T>(id: ServiceIdentifier<T>, instance: T): void {
    this.singletonInstances.set(id, instance);
  }

  addRootDisposeAction(action: () => Promise<void>): void {
    this.rootDisposeActions.push(action);
  }

  async dispose(): Promise<void> {
    await Promise.all(this.rootDisposeActions.map((action) => action()));
    this.descriptors.clear();
    this.singletonInstances.clear();
    this.rootDisposeActions.length = 0;
  }

  private isDisposable(instance: unknown): instance is { dispose(): Promise<void> } {
    return typeof instance === "object" && instance !== null && typeof (instance as { dispose?: unknown }).dispose === "function";
  }
}
