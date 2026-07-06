import { IServiceScope } from "./IServiceScope";

export interface IServiceScopeFactory {
  createScope(): IServiceScope;
}
