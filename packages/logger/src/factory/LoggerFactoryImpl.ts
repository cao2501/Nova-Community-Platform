import { LoggerFactory, LoggerFactoryOptions } from "../interfaces/LoggerFactory";
import { DefaultLogger } from "../DefaultLogger";
import { LogLevel } from "../interfaces/LogLevel";

export class LoggerFactoryImpl implements LoggerFactory {
  createLogger(options: LoggerFactoryOptions) {
    return new DefaultLogger({
      name: options.name,
      level: options.level ?? LogLevel.INFO,
      transports: options.transports,
      context: options.context,
      metadata: options.metadata,
      correlationId: options.correlationId,
    });
  }
}
