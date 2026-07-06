import { LoggerFormatter } from "../interfaces/LoggerFormatter";
import { LogRecord } from "../types/LogRecord";

export class JsonFormatter implements LoggerFormatter<string> {
  format(entry: LogRecord): string {
    return JSON.stringify(entry);
  }
}
