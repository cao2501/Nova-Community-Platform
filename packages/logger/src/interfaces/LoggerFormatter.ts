import { LogRecord } from "../types/LogRecord";

export interface LoggerFormatter<T = string> {
  format(entry: LogRecord): T;
}
