import { LoggerFormatter } from "../interfaces/LoggerFormatter";
import { LogRecord } from "../types/LogRecord";
import { LogLevel } from "../interfaces/LogLevel";

const levelColors: Record<LogLevel, string> = {
  [LogLevel.TRACE]: "\x1b[37m",
  [LogLevel.DEBUG]: "\x1b[36m",
  [LogLevel.INFO]: "\x1b[32m",
  [LogLevel.WARN]: "\x1b[33m",
  [LogLevel.ERROR]: "\x1b[31m",
  [LogLevel.FATAL]: "\x1b[35m",
};

const resetColor = "\x1b[0m";

export class ColoredConsoleFormatter implements LoggerFormatter<string> {
  format(entry: LogRecord): string {
    const level = `${levelColors[entry.level]}${entry.level}${resetColor}`;
    const base = `${entry.timestamp} [${level}] ${entry.loggerName} - ${entry.message}`;

    const context = Object.keys(entry.context).length
      ? ` ${JSON.stringify(entry.context)}`
      : "";

    const metadata = Object.keys(entry.metadata).length
      ? ` ${JSON.stringify(entry.metadata)}`
      : "";

    const correlation = entry.correlationId ? ` correlationId=${entry.correlationId}` : "";
    const error = entry.error ? `\n${entry.error.name}: ${entry.error.message}\n${entry.error.stack ?? ""}` : "";

    return `${base}${context}${metadata}${correlation}${error}`;
  }
}
