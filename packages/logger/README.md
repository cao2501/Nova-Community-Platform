# @community-platform/logger

A reusable, framework-agnostic logger package for the community platform.

## Features

- Typed logger interface with `TRACE` / `DEBUG` / `INFO` / `WARN` / `ERROR` / `FATAL`
- Pluggable transports via `LoggerTransport`
- Pluggable formatters via `LoggerFormatter`
- Child loggers, context, metadata, error stack capture, and correlation IDs
- Dependency-injectable factory-based creation
- No framework or singleton dependencies

## Package Layout

- `src/interfaces/` - public logger interfaces
- `src/factory/` - logger factory implementation
- `src/transports/` - transport implementations
- `src/formatters/` - formatter implementations
- `src/types/` - shared logger model types
- `src/DefaultLogger.ts` - main logger implementation
- `src/LoggerCore.ts` - backward-compatible alias for DefaultLogger
- `src/index.ts` - package exports

## Documentation

- `docs/Architecture.md` - architecture rationale and dependency injection design
- `docs/Flow.md` - logger runtime flow and transport chain

## Documentation

- `docs/Architecture.md` - architecture rationale and dependency injection design
- `docs/Flow.md` - logger runtime flow and transport chain

## Usage Example

```ts
import {
  LoggerFactoryImpl,
  ConsoleTransport,
  PlainTextFormatter,
  LogLevel,
} from "@community-platform/logger";

const loggerFactory = new LoggerFactoryImpl();

const logger = loggerFactory.createLogger({
  name: "app",
  level: LogLevel.DEBUG,
  transports: [
    {
      transport: new ConsoleTransport(),
      formatter: new PlainTextFormatter(),
    },
  ],
});

await logger.info("Application started", {
  context: { service: "api" },
  correlationId: "1234",
});
```
