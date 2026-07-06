import { IServiceCollection } from "./IServiceCollection";
import { IServiceProvider } from "./IServiceProvider";
import { IServiceScopeFactory } from "./IServiceScopeFactory";

export interface IContainer extends IServiceCollection, IServiceProvider, IServiceScopeFactory {
  dispose(): Promise<void>;
}
