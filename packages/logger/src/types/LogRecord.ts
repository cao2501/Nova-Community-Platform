import { LogLevel } from "../interfaces/LogLevel";
import { LoggerContext } from "./LoggerContext";
import { LoggerMetadata } from "./LoggerMetadata";

export interface LogRecord {
  readonly timestamp: string;
  readonly level: LogLevel;
  readonly loggerName: string;
  readonly message: string;
  readonly context: LoggerContext;
  readonly metadata: LoggerMetadata;
  readonly correlationId?: string;
  readonly error?: {
    readonly name: string;
    readonly message: string;
    readonly stack?: string;
  };
}

export type LoggerEntry = LogRecord;
