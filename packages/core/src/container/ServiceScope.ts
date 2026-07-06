import { IServiceScope } from "../interfaces/IServiceScope";
import { IServiceProvider } from "../interfaces/IServiceProvider";

export class ServiceScope implements IServiceScope {
  public readonly serviceProvider: IServiceProvider;
  private readonly disposeActions: Array<() => Promise<void>>;

  constructor(serviceProvider: IServiceProvider, disposeActions: Array<() => Promise<void>> = []) {
    this.serviceProvider = serviceProvider;
    this.disposeActions = disposeActions;
  }

  async dispose(): Promise<void> {
    await Promise.all(this.disposeActions.map((action) => action()));
  }
}
