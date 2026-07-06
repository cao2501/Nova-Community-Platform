# Architecture

High-level architecture for the configuration framework. The package is split into:

- `providers` — pluggable config sources (env, json, memory, future db).
- `loaders` — orchestrate providers and produce a combined config map.
- `registry` — maintains config schemas used for validation.
- `manager` — public API for getting config values and performing validation/reload.
- `merge` — utilities for merging multiple config fragments.

All components depend on interfaces only to preserve testability and DI integration.
