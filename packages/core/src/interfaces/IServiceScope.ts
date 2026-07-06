import { IServiceProvider } from "./IServiceProvider";

export interface IServiceScope {
  readonly serviceProvider: IServiceProvider;
  dispose(): Promise<void>;
}
