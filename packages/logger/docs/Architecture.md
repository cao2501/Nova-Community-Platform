# Logger Package Architecture

## Overview

The `@community-platform/logger` package is a reusable, framework-agnostic logging system designed for enterprise applications. It is intentionally implemented with strict boundaries between interfaces, transports, formatters, and implementations.

## Design Goals

- Framework-agnostic: No dependencies on web frameworks, Discord, or business logic.
- Dependency injectable: All behavior is provided via constructor and factory injection.
- Interface-first: Every feature is defined by interfaces to maximize testability and extensibility.
- No singleton: Logger instances are created from a factory, so different apps can provide their own configuration.
- Production-ready architecture: Supports multiple transports, formatters, metadata, correlation ids, and child loggers.

## Core Components

### Logger

The `Logger` interface defines the public API for log operations and context augmentation. It includes all required log levels and methods for:

- `trace`, `debug`, `info`, `warn`, `error`, `fatal`
- `log(level, message, options)`
- `child(context, metadata)`
- `withContext(context)`
- `withMetadata(metadata)`
- `withCorrelationId(correlationId)`

### LoggerFactory

The `LoggerFactory` interface provides a single entrypoint for creating new logger instances. It accepts a `LoggerFactoryOptions` object with:

- `name`
- `level`
- `transports`
- `context`
- `metadata`
- `correlationId`

The `LoggerFactoryImpl` uses these options to construct a `LoggerCore` instance.

### LoggerTransport

`LoggerTransport` is the abstraction for any output mechanism. It is intentionally generic and only requires a `log(formattedEntry)` method.

`LoggerTransportDefinition` couples a transport with a formatter, allowing each transport to use its own output format.

### LoggerFormatter

`LoggerFormatter` converts a `LoggerEntry` to a transport-specific value. This package ships with:

- `PlainTextFormatter`
- `JsonFormatter`
- `ColoredConsoleFormatter`

## Features

### Child Logger

The `LoggerCore.child()` method creates derived logger instances with inherited configuration. Child loggers merge parent context and metadata with additions from the caller.

### Context and Metadata

The logger separates runtime context (`LoggerContext`) and arbitrary metadata (`LoggerMetadata`). This allows structured logs to carry request or operation state without coupling to application models.

### Correlation ID

The logger supports correlation IDs at the logger instance and per-message levels. This enables distributed tracing across transport boundaries.

### Error Stack

When an `Error` is provided in `LoggerMessageOptions`, the logger includes name, message, and stack in the structured entry.

## Extensibility

New transports can be added by implementing `LoggerTransport<T>`.

New formatters can be added by implementing `LoggerFormatter<T>`.

The package does not assume the shape of transport output, making it easy to integrate with:

- Console
- File
- Remote APIs
- Custom sinks such as log aggregation services

## Dependency Injection

The logger package is designed for dependency injection:

- Applications instantiate `LoggerFactoryImpl` with transport definitions.
- Logger instances are returned with configured dependencies.
- No singleton state is used, ensuring safe use in tests and multi-tenant environments.

## SOLID Principles

- Single Responsibility: Each interface and class has a focused responsibility.
- Open/Closed: New transports and formatters can be added without modifying existing code.
- Liskov Substitution: Implementations conform to the interfaces they expose.
- Interface Segregation: Consumers depend only on the abstractions they need.
- Dependency Inversion: High-level logger infrastructure depends on abstractions rather than concrete transports.
