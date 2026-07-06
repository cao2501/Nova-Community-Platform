import { LogLevel } from "../interfaces/LogLevel";
import { Logger } from "../interfaces/Logger";
import { LoggerTransportDefinition } from "../interfaces/LoggerTransport";
import { LoggerContext } from "../types/LoggerContext";
import { LoggerMetadata } from "../types/LoggerMetadata";
import { LoggerMessageOptions } from "../types/LoggerMessageOptions";
import { LogRecord } from "../types/LogRecord";

const levelPriority: Record<LogLevel, number> = {
  [LogLevel.TRACE]: 10,
  [LogLevel.DEBUG]: 20,
  [LogLevel.INFO]: 30,
  [LogLevel.WARN]: 40,
  [LogLevel.ERROR]: 50,
  [LogLevel.FATAL]: 60,
};

const mergeContext = (...contexts: Array<LoggerContext | undefined>): LoggerContext =>
  Object.assign({}, ...contexts.filter(Boolean));

const mergeMetadata = (...metadatas: Array<LoggerMetadata | undefined>): LoggerMetadata =>
  Object.assign({}, ...metadatas.filter(Boolean));

export class DefaultLogger implements Logger {
  public readonly name: string;
  private readonly level: LogLevel;
  private readonly transports: Array<LoggerTransportDefinition<unknown>>;
  private readonly context: LoggerContext;
  private readonly metadata: LoggerMetadata;
  private readonly correlationId?: string;

  constructor(options: {
    name: string;
    level: LogLevel;
    transports: Array<LoggerTransportDefinition<unknown>>;
    context?: LoggerContext;
    metadata?: LoggerMetadata;
    correlationId?: string;
  }) {
    this.name = options.name;
    this.level = options.level;
    this.transports = [...options.transports];
    this.context = { ...(options.context ?? {}) };
    this.metadata = { ...(options.metadata ?? {}) };
    this.correlationId = options.correlationId;
  }

  async trace(message: string, options?: LoggerMessageOptions): Promise<void> {
    await this.log(LogLevel.TRACE, message, options);
  }

  async debug(message: string, options?: LoggerMessageOptions): Promise<void> {
    await this.log(LogLevel.DEBUG, message, options);
  }

  async info(message: string, options?: LoggerMessageOptions): Promise<void> {
    await this.log(LogLevel.INFO, message, options);
  }

  async warn(message: string, options?: LoggerMessageOptions): Promise<void> {
    await this.log(LogLevel.WARN, message, options);
  }

  async error(message: string, options?: LoggerMessageOptions): Promise<void> {
    await this.log(LogLevel.ERROR, message, options);
  }

  async fatal(message: string, options?: LoggerMessageOptions): Promise<void> {
    await this.log(LogLevel.FATAL, message, options);
  }

  async log(level: LogLevel, message: string, options?: LoggerMessageOptions): Promise<void> {
    if (levelPriority[level] < levelPriority[this.level]) {
      return;
    }

    const entry: LogRecord = {
      timestamp: new Date().toISOString(),
      level,
      loggerName: this.name,
      message,
      context: mergeContext(this.context, options?.context),
      metadata: mergeMetadata(this.metadata, options?.metadata),
      correlationId: options?.correlationId ?? this.correlationId,
      error: options?.error
        ? {
            name: options.error.name,
            message: options.error.message,
            stack: options.error.stack,
          }
        : undefined,
    };

    await Promise.all(
      this.transports.map(async ({ transport, formatter }) => {
        const formatted = formatter.format(entry);
        await transport.log(formatted);
      }),
    );
  }

  child(context?: LoggerContext, metadata?: LoggerMetadata): Logger {
    return new DefaultLogger({
      name: this.name,
      level: this.level,
      transports: this.transports,
      context: mergeContext(this.context, context),
      metadata: mergeMetadata(this.metadata, metadata),
      correlationId: this.correlationId,
    });
  }

  withContext(context: LoggerContext): Logger {
    return this.child(context, undefined);
  }

  withMetadata(metadata: LoggerMetadata): Logger {
    return this.child(undefined, metadata);
  }

  withCorrelationId(correlationId: string): Logger {
    return new DefaultLogger({
      name: this.name,
      level: this.level,
      transports: this.transports,
      context: this.context,
      metadata: this.metadata,
      correlationId,
    });
  }
}
