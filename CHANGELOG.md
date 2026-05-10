# Changelog

All notable changes to DevTrack are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.1.0] — 2025-05-10

### Added
- Next.js 14 (App Router) frontend scaffold with TypeScript and Tailwind CSS
- GitHub OAuth authentication via NextAuth.js
- `SessionProvider` wrapper and `session.accessToken` exposure via JWT callbacks
- Dashboard page with `ContributionGraph`, `PRMetrics`, and `GoalTracker` components
- GitHub API client (`client/src/lib/github.ts`) for fetching events and repos
- Express + TypeScript backend with `/api/v1/metrics/contributions` and `/api/v1/metrics/prs` endpoints
- JWT auth middleware (`requireAuth`) for protected API routes
- Prisma schema with `User`, `Goal`, and `MetricSnapshot` models (PostgreSQL)
- GitHub Actions CI — lint and type-check on every PR and push to `main`
- Issue templates: bug report, feature request, good-first-issue
- Pull request template with checklist
- `CONTRIBUTING.md` with branch naming, commit style, and review process
- `CODE_OF_CONDUCT.md` (Contributor Covenant)
- MIT License

### Fixed
- Missing NextAuth API route for App Router (`/api/auth/[...nextauth]/route.ts`) — GitHub sign-in returned 404 (fixes #7, by @Chris8115)

---

[0.1.0]: https://github.com/Priyanshu-byte-coder/devtrack/releases/tag/v0.1.0
