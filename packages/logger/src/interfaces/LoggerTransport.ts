import { LoggerFormatter } from "./LoggerFormatter";

export abstract class BaseTransport<T = string> {
  public abstract readonly name: string;
  public abstract log(formattedEntry: T): Promise<void>;
}

export interface LoggerTransport<T = string> extends BaseTransport<T> {}

export interface LoggerTransportDefinition<T = string> {
  transport: LoggerTransport<T>;
  formatter: LoggerFormatter<T>;
}
