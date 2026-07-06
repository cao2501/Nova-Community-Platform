# Container Sequence

- `Container.register*()` adds descriptors to the container.
- `Container.createScope()` creates a scoped service provider.
- `serviceProvider.resolve(id)` starts instance resolution.
- `Container.resolveInternal()` checks lifetime and caches instances.
- `Container.createInstance()` constructs or invokes factories.
- Disposable instances are tracked and cleaned up when the scope is disposed.
