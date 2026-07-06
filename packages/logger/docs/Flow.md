# Logger Flow

This document describes the runtime flow for the logger package.

1. A client creates a logger instance via `LoggerFactoryImpl#createLogger()`.
2. The factory validates the provided `LoggerConfig` and constructs a `DefaultLogger`.
3. A logging call like `logger.info()` invokes `Logger#log()`.
4. `DefaultLogger` builds a `LogRecord` containing:
   - timestamp
   - level
   - logger name
   - message
   - merged context
   - merged metadata
   - optional correlation ID
   - optional error details
5. The logger passes the `LogRecord` to each configured transport.
6. Each transport uses its associated formatter to convert the record into an output form.
7. The transport writes or sends the formatted payload.

This flow is intentionally transport-agnostic and relies entirely on interface contracts. New transports and formatters can be added without changing the core flow.
