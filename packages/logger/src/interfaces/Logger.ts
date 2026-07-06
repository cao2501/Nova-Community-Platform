import { LogLevel } from "./LogLevel";
import { LoggerContext } from "../types/LoggerContext";
import { LoggerMetadata } from "../types/LoggerMetadata";
import { LoggerMessageOptions } from "../types/LoggerMessageOptions";

export interface Logger {
  readonly name: string;

  trace(message: string, options?: LoggerMessageOptions): Promise<void>;
  debug(message: string, options?: LoggerMessageOptions): Promise<void>;
  info(message: string, options?: LoggerMessageOptions): Promise<void>;
  warn(message: string, options?: LoggerMessageOptions): Promise<void>;
  error(message: string, options?: LoggerMessageOptions): Promise<void>;
  fatal(message: string, options?: LoggerMessageOptions): Promise<void>;

  log(level: LogLevel, message: string, options?: LoggerMessageOptions): Promise<void>;

  child(context?: LoggerContext, metadata?: LoggerMetadata): Logger;
  withContext(context: LoggerContext): Logger;
  withMetadata(metadata: LoggerMetadata): Logger;
  withCorrelationId(correlationId: string): Logger;
}
