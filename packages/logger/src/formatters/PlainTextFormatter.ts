import { LoggerFormatter } from "../interfaces/LoggerFormatter";
import { LogRecord } from "../types/LogRecord";

export class PlainTextFormatter implements LoggerFormatter<string> {
  format(entry: LogRecord): string {
    const context = Object.keys(entry.context).length
      ? ` context=${JSON.stringify(entry.context)}`
      : "";

    const metadata = Object.keys(entry.metadata).length
      ? ` metadata=${JSON.stringify(entry.metadata)}`
      : "";

    const error = entry.error
      ? ` error=${entry.error.name}: ${entry.error.message}\n${entry.error.stack ?? ""}`
      : "";

    const correlation = entry.correlationId ? ` correlationId=${entry.correlationId}` : "";

    return `${entry.timestamp} [${entry.level}] ${entry.loggerName} - ${entry.message}${context}${metadata}${correlation}${error}`;
  }
}
