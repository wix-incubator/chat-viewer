# Agent Guidelines

## Project Structure & Module Organization

This is a TypeScript/React library for virtualized chat rendering.

- Package source lives in `lib/`, with public exports collected in `lib/index.ts`.
- The Vite demo app lives in `src/` and uses the library through local imports.
- Generated API markdown is in `docs/`; regenerate it with TypeDoc instead of hand-editing API pages. Build output goes to `dist/` and demo website output goes to `website/`.
- Workflow and release automation lives under `.github/`.
- The checked-in Yarn runtime is under `.yarn/releases/` and is part of the repository contract.

## Build, Test, and Development Commands

- `NPQ_PKG_MGR=yarn npx npq install`: installs dependencies through the same `npq` security gate used by CI.
- `yarn dev`: starts the Vite demo at the local dev server.
- `yarn build`: builds both the package and demo.
- `yarn build:lib`: type-checks `lib/` and builds the distributable package.
- `yarn build:docs`: regenerates TypeDoc output in `docs/` and `website/`.
- `yarn lint` / `yarn lint:fix`: runs lint checks or automatic fixes.
- `yarn format:check` / `yarn format`: checks or applies formatting.

## Coding Style & Naming Conventions

- Use strict TypeScript and React JSX.
- Keep source files in kebab case, for example `follow-strategies.ts` and `use-seen-ids-tracking.ts`.
- Components and types use PascalCase; hooks use `use*`; constants use uppercase when they are
  sentinel values.
- Let linter enforce formatting and code validation.
- Do not format generated `docs/**` output manually unless the generator produced it.
- For editing documentation, edit corresponding code comments in the source files. They will end up in the generated API docs.

## Testing Guidelines

- There is no dedicated test runner or `yarn test` script yet.
- For now, validate changes with `yarn lint`, `yarn format:check`, and `yarn build`.
- For UI or scrolling behavior changes, also exercise the demo with `yarn dev` and note the
  manual scenario in the PR.
- When adding a tests, keep tests in `tests` folder and use `*.test.ts` or `*.test.tsx` names.

## Commit & Pull Request Guidelines

- Follow the existing concise conventional style in history, such as `fix: ...`,
  `ci: ...`, or `chore: ...`.
- PRs should include a short problem/solution summary, linked issue when relevant, and the validation commands run.
- Add screenshots or screen recordings for visible demo changes.
- Do not weaken the `npq` install gate or remove pinned GitHub Action SHAs without explicit security approval.
