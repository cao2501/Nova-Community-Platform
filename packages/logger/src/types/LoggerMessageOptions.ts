import { LoggerContext } from "./LoggerContext";
import { LoggerMetadata } from "./LoggerMetadata";

export interface LoggerMessageOptions {
  context?: LoggerContext;
  metadata?: LoggerMetadata;
  correlationId?: string;
  error?: Error;
}
