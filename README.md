# gotirekha-schemas

Shapes and fixed lists that cross from one Gotirekha program to another (`@gotirekha/schemas`). Only cross-program things go in. Nothing secret ever goes in: this repo is public.

## Install

```sh
pnpm add github:ifoysalahmmed/gotirekha-schemas#v0.1.0
```

pnpm builds the package on install (`prepare`), so the installing program has to allow `@gotirekha/schemas` to run its build script.

## Scripts

- `pnpm build`: compile `src/` to `dist/`.
- `pnpm typecheck`: check types without writing files.
- `pnpm lint`: run ESLint.

## Release

1. Pull request, then merge to `main`.
2. Tag `main` with the new version (`git tag v0.2.0`) and push the tag (`git push origin v0.2.0`).
3. Raise the tag in each program that uses it (`pnpm add github:ifoysalahmmed/gotirekha-schemas#vX.Y.Z`), and replace the commit hash in that program's `pnpm-workspace.yaml` (`allowBuilds`); the install error prints the new one.

A change that breaks a record is a new major version. The program that reads a record is deployed before the one that sends it.
