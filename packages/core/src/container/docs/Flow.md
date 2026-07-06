# Container Flow

1. A caller creates a `Container` instance.
2. Services are registered through `register*` methods.
3. `createScope()` builds a scoped provider and tracks scoped instances.
4. `resolve()` and `tryResolve()` invoke `resolveInternal()`.
5. `resolveInternal()` selects service lifetime behavior:
   - Singleton: shared across all scopes
   - Scoped: shared within scope
   - Transient: new each resolution
6. The container builds instances via constructor injection or factory functions.
7. If a service implements `dispose()`, it is registered for later cleanup.
8. When a scope is disposed, all disposable instances created within that scope are disposed.
