import { LogLevel } from "./LogLevel";
import { LoggerTransportDefinition } from "./LoggerTransport";
import { LoggerContext } from "../types/LoggerContext";
import { LoggerMetadata } from "../types/LoggerMetadata";

export interface LoggerConfig {
  name: string;
  level?: LogLevel;
  transports: Array<LoggerTransportDefinition<unknown>>;
  context?: LoggerContext;
  metadata?: LoggerMetadata;
  correlationId?: string;
}
