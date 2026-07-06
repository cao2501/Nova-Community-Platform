# Design Decisions

- Custom DI container: avoids third-party libraries and keeps the architecture under platform control.
- Interface-first design: promotes testability and inversion of control.
- Service lifetimes: Singleton, Scoped, Transient are supported for enterprise needs.
- No global state: container instances encapsulate registration state.
- Constructor metadata: dependencies can be described explicitly for future automation.
- Disposable support: services are disposed to avoid resource leaks.
- Circular detection: a resolution stack prevents infinite dependency loops.
