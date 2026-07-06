export type ServiceIdentifier<T = unknown> = symbol | string | Newable<T>;

export interface Newable<T> {
  new (...args: unknown[]): T;
}
