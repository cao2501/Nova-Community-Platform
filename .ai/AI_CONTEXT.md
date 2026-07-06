# AI Context

This repository is a modern enterprise Turborepo monorepo for a community platform ecosystem. It is built for maintainability, reuse, and scalable workspace development.

## Primary goals

- Preserve a clear separation between `apps/` and reusable `packages/`.
- Keep internal tooling centralized in `internal/` for shared ESLint, TypeScript, and Prettier configuration.
- Avoid implementing business logic or product features within this scaffold.
- Maintain a code-first monorepo that supports fast local iteration and consistent developer workflows.

## Constraints

- No Discord-specific implementation or business-layer code is included.
- No backend API or frontend feature work is introduced here.
- All shared config should be owned by internal workspace packages and root configuration files.

## Developer expectations

- `pnpm install` boots the workspace.
- `pnpm dev` starts local development pipelines.
- `pnpm build` compiles packages and apps.
- `pnpm lint` validates code style across the monorepo.
- `pnpm test` is reserved for workspace test tasks.
