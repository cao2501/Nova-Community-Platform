# Community Platform Monorepo

Enterprise-grade Turborepo scaffold for a modular TypeScript workspace.

## Overview

This monorepo is designed to support a multi-service ecosystem with a clean separation between production applications and shared packages. It favors reusable internal packages, enforced workspace policies, and centralized configuration for developer experience consistency.

## Architecture

- `apps/` - runtime applications and delivery surfaces.
- `packages/` - reusable libraries, shared utilities, and contract definitions.
- `internal/` - shared workspace packages for TypeScript, ESLint, and Prettier config.
- `.ai/` - repository context, planning, and architecture guidance.
- `.changeset/` - release and changelog workflow config.
- `.github/` - CI/CD workflows.

### Key packages

- `@community-platform/contracts` - shared contract and schema definitions.
- `@community-platform/core` - core domain utilities.
- `@community-platform/testing` - test helpers and fixtures.
- `@community-platform/shared` - shared assets and helpers.

## Workflow

### Setup

```bash
pnpm install
pnpm prepare
```

### Development

```bash
pnpm dev
```

### Validation

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm format
```

### Build

```bash
pnpm build
```

### Release

```bash
pnpm changeset
```

## Contribution Guide

1. Keep changes small and focused.
2. Add or update tests for all new packages and tooling rules.
3. Use `pnpm lint` before committing.
4. Create a Changeset for any package version bump.
5. Follow workspace conventions: shared logic belongs in `packages/`, app-specific behavior belongs in `apps/`.

## Workspace policies

- Shared linting and formatting rules live in `internal/`.
- Every `app` and `package` has a local `tsconfig.json` extending the shared workspace config.
- `package.json` scripts are lightweight and delegate to the root Turbo pipeline.
- No business logic is implemented at the monorepo scaffold level.

