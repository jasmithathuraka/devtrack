# Contributing to DevTrack

Thanks for your interest in contributing! This guide will get you from zero to a merged PR.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Find an Issue](#how-to-find-an-issue)
- [Setting Up Locally](#setting-up-locally)
- [Making Changes](#making-changes)
- [Submitting a PR](#submitting-a-pr)
- [Review Process](#review-process)
- [Issue Labels](#issue-labels)

---

## Code of Conduct

This project follows the [Contributor Covenant](./CODE_OF_CONDUCT.md). Be respectful.

---

## How to Find an Issue

1. Go to [Issues](../../issues)
2. Filter by label:
   - `good-first-issue` — no prior codebase knowledge needed, well-scoped
   - `medium` — requires reading some existing code
   - `advanced` — architectural changes, requires discussion first
3. Comment "I'd like to work on this" to get assigned
4. **Do not open a PR for an unassigned issue** — we may already be working on it

First-time contributors: start with `good-first-issue` only.

---

## Setting Up Locally

Follow the [README setup guide](./README.md#getting-started) first.

Additional dev tools:

```bash
# From repo root — run both client and server with one command
npm run dev:all
```

Requires `concurrently` installed globally or via root `package.json`.

---

## Making Changes

### Branch naming

```
feat/issue-42-add-dark-mode
fix/issue-17-pr-count-off-by-one
docs/update-setup-guide
```

### Commit style (Conventional Commits)

```
feat: add dark mode toggle to dashboard
fix: correct PR merge rate calculation
docs: add PostgreSQL setup troubleshooting
```

### Code style

- TypeScript strict mode — no `any` types
- ESLint + Prettier configured — run `npm run lint` before pushing
- Components: one file per component, named exports
- API routes: RESTful, versioned under `/api/v1/`

---

## Submitting a PR

1. Push your branch to your fork
2. Open a PR against `main`
3. Fill out the PR template completely
4. Link the issue: `Closes #42`
5. Ensure CI passes (lint + type check)

PRs without a linked issue will not be reviewed.

---

## Review Process

- First response within **48 hours**
- Address all review comments before requesting re-review
- After approval, maintainer will merge (contributors do not merge their own PRs)
- Merged PRs get a shoutout in the next release notes

---

## Issue Labels

| Label | Meaning |
|-------|---------|
| `good-first-issue` | Beginner friendly, scoped, documented |
| `medium` | Requires some context, moderate complexity |
| `advanced` | Architectural, discuss in issue before coding |
| `bug` | Something broken |
| `enhancement` | New feature or improvement |
| `docs` | Documentation only |
| `needs-triage` | Not yet assessed |
| `help-wanted` | Maintainer needs external input |

---

## Questions?

Open a [GitHub Discussion](../../discussions) — don't open an issue for questions.
