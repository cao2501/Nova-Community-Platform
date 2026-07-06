# Sequence

Sequence of operations for loading configuration:

1. Register providers and schemas.
2. Call `reload()` on the manager to pull values and validate.
3. Use `get()`/`getOrDefault()` to access config values.
