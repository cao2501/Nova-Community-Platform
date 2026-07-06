import { Logger } from "./Logger";
import { LoggerConfig } from "./LoggerConfig";

export interface LoggerFactoryOptions extends LoggerConfig {}

export interface LoggerFactory {
  createLogger(options: LoggerFactoryOptions): Logger;
}
