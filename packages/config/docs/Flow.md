# Flow

1. Providers load their config fragment.
2. Loader aggregates fragments into a single map.
3. Merger applies deterministic precedence rules.
4. Registry provides schemas for validation.
5. Manager exposes typed accessors and orchestrates reload/validate.
