# DI Container Architecture

The container is designed as a lightweight, custom dependency injection system.

Key principles:
- Interface driven: every component depends on interfaces, not concrete classes.
- No global state: all registration state is held by container instances.
- No static singletons: dependency lifetimes are managed explicitly.
- Constructor injection ready: service descriptors allow dependency metadata.
- Future decorators: a placeholder decorator supports later extension.
- Lazy resolution: services are resolved on demand.
- Circular dependency detection: resolution tracks activation paths.
- Disposable services: resolved instances with `dispose()` are cleaned up.
